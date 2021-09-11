const { ApolloError } = require("apollo-server-express");
const getNextSequenceValue = require("../../../helpers/getNextSequenceValue");

const { Vehicle } = require("../../../models/vehicle");
const { DateTime } = require("luxon");

const { Storage } = require("@google-cloud/storage");
const path = require("path");
const { FuelUsage } = require("../../../models/FuelUsage");
const { pubsub } = require("../../../helpers/pubSub");

const removeWhiteSpaces = (name) => {
  return name.replace(/\s+/g, "");
};

function uploadImage(imageFile) {
  return new Promise(async (resolve, reject) => {
    const bucketName = "amd-learners-46de1.appspot.com";
    const storage = new Storage({
      keyFilename: path.join(__dirname, "../../../amd-learners-key.json"),
    });
    const myBucket = storage.bucket(bucketName);
    const { createReadStream, filename } = await imageFile;
    let sanitizedName = removeWhiteSpaces(filename);

    const file = myBucket.file(`vehicles/${sanitizedName}`);

    await createReadStream().pipe(
      file.createWriteStream().on("finish", () => {
        file
          .makePublic()
          .then(() => {
            const imageUrl = `https://storage.googleapis.com/amd-learners-46de1.appspot.com/vehicles/${sanitizedName}`;
            resolve(imageUrl);
            console.log("Image published to the bucket");
          })
          .catch((err) => {
            reject(err);
            console.log(err);
          });
        console.log(`/vehicles/${sanitizedName} uploaded to ${bucketName}`);
      })
    );
  });
}

const vehicleMutation = {
  addVehicle: async (_, args, context) => {
    const {
      reg_no,
      type,
      brand,
      model,
      owner_name,
      owner_mobile,
      owner_address,
      condition,
      mileage,
      last_service_date,
      service_period,
      image,
    } = args.input;
    const { isAuth } = context;
    try {
      if (!isAuth) {
        throw new ApolloError("Unauthenticated!");
      }

      const existingVehicle = await Vehicle.findOne({ reg_no: reg_no });
      if (existingVehicle) {
        throw new ApolloError("Vehicle already exists!");
      }

      var vehicleId = await getNextSequenceValue("vehicleId");

      const newVehicle = await uploadImage(image).then(async (imageUrl) => {
        const vehicle = new Vehicle({
          _id: vehicleId,
          reg_no,
          type,
          brand,
          model,
          owner_name,
          owner_mobile,
          owner_address,
          condition,
          mileage,
          last_service_date,
          service_period,
          image: imageUrl,
        });

        const result = await vehicle.save();

        return result;
      });

      return newVehicle;
    } catch (error) {
      throw new ApolloError(error);
    }
  },
  updateVehicle: async (_, args) => {
    try {
      const { id, input } = args;

      const inputObj = {
        ...input,
      };

      if (input.image) {
        const imageUpdatedVehicle = await uploadImage(input.image).then(
          async (imageUrl) => {
            Object.assign(inputObj, {
              image: imageUrl,
            });
            const updatedVehicle = await Vehicle.findByIdAndUpdate(id, {
              ...inputObj,
            });

            return updatedVehicle;
          }
        );

        return imageUpdatedVehicle;
      } else {
        const updateWithoutImage = await Vehicle.findByIdAndUpdate(id, {
          ...inputObj,
        });

        return updateWithoutImage;
      }
    } catch (error) {
      throw new ApolloError(error);
    }
  },
  deleteVehicle: async (_, args) => {
    try {
      const { id } = args;
      const deletedVehicle = await Vehicle.findByIdAndDelete(id);

      if (!deletedVehicle) {
        throw new ApolloError("Vehicle ID doesn't exist!");
      }

      return `Succeffully deleted the vehicle`;
    } catch (error) {
      throw new ApolloError(error);
    }
  },
  addFuelUsage: async (_, args) => {
    try {
      const { vehicleId, usage } = args.input;
      const date = DateTime.now();
      const year = date.toLocaleString({ year: "numeric" });
      const lastMonth = date.toLocaleString({ month: "numeric" }) - 1;

      const existingFuelUsage = await FuelUsage.findOne({
        vehicleId: vehicleId,
        month: lastMonth,
        year: year,
      });

      if (existingFuelUsage) {
        throw new ApolloError("Fuel Usage exists");
      }

      const newFuelUsage = new FuelUsage({
        vehicleId: vehicleId,
        month: lastMonth,
        year: year,
        usage: usage,
      });

      await Vehicle.findByIdAndUpdate(vehicleId, {
        $push: { fuel_usage: newFuelUsage },
      });

      const result = newFuelUsage.save();
      await pubsub.publish("FUEL_USAGE_CREATED", {
        fuelUsageCreated: result,
      });

      return result;
    } catch (error) {
      throw new ApolloError(error);
    }
  },
};

module.exports = { vehicleMutation };
