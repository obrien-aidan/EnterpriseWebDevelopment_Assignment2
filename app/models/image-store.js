const cloudinary = require("cloudinary");
const fs = require("fs");
const util = require("util");
const writeFile = util.promisify(fs.writeFile);

const ImageStore = {
  configure: function() {
    const credentials = {
      cloud_name: process.env.name,
      api_key: process.env.key,
      api_secret: process.env.secret,
    };
    cloudinary.config(credentials);
  },


  //UPLOAD IMAGE
  uploadIslandImage: async function(image, tag, user) {
    await writeFile("./public/temp.img", image);
    const result = await cloudinary.v2.uploader.upload("./public/temp.img", {
      //public_id: tag,
    });
    console.log(result.secure_url);
    console.log(result);
    return result.secure_url;
  },
};

module.exports = ImageStore;
