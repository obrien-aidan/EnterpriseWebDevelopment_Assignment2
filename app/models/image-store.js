//To deploy static assets
const cloudinary = require("cloudinary");
//To access physical file system
const fs = require("fs");
//Provide utility functions to help debugging processes
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

  //Fetch all the uploaded images from cloudinary
  //getAllImages: async function() {
 //   const result = await cloudinary.v2.api.resources();
//    return result.resources;
//  },

  //Uploaded image on cloudinary for Add Island Page
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
