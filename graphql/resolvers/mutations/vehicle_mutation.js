const { ApolloError } = require("apollo-server-express");
const getNextSequenceValue = require("../../../helpers/getNextSequenceValue");

const { Vehicle } = require("../../../models/vehicle");

const { Storage } = require("@google-cloud/storage");
const path = require("path");

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
    const { userId, isAuth } = context;
    try {
      // if (!isAuth) {
      //   throw new ApolloError("Unauthenticated!");
      // }

      const existingVehicle = await Vehicle.findOne({ reg_no: reg_no });
      if (existingVehicle) {
        throw new ApolloError("Vehicle already exists!");
      }

      var vehicleId = await getNextSequenceValue("vehicleId");

      const removeWhiteSpaces = (name) => {
        return name.replace(/\s+/g, "");
      };

      const bucketName = "amd-learners.appspot.com";
      const storage = new Storage({
        keyFilename: path.join(__dirname, "../../../amd-learners-key.json"),
      });
      const myBucket = storage.bucket(bucketName);
      const { createReadStream, filename, mimetype, encoding } = await image;
      let sanitizedName = removeWhiteSpaces(filename);

      const file = myBucket.file(`vehicles/${sanitizedName}`);

      await createReadStream().pipe(
        file.createWriteStream().on("finish", () => {
          file
            .makePublic()
            .then(() => {
              console.log("images published");
            })
            .catch((err) => {
              console.log(err);
            });
          console.log(`/vehicles/${sanitizedName} uploaded to ${bucketName}`);
        })
      );

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
        image: `https://storage.googleapis.com/amd-learners.appspot.com/vehicles/${sanitizedName}`,
      });

      const result = await vehicle.save();

      return result;
    } catch (error) {
      throw new ApolloError(error);
    }
  },
};

module.exports = { vehicleMutation };
