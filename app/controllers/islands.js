const ImageStore = require("../models/image-store");
const User = require("../models/user");
const Island = require("../models/islands");
const Joi = require("@hapi/joi");

const Islands = {
  //ADD ISLAND PAGE
  home: {
    handler: async function(request, h) {
      return h.view("home", { title: "addIsland" });
    },
  },
  //LIST ISLANDS
  report: {
    handler: async function(request, h) {
      const islands = await Island.find()
          .populate("user")
          .lean();
      return h.view("report", {
        title: "List Islands",
        islands: islands,
      });
    },
  },
  //ADD ISLAND
  addIsland: {
    validate: {
      payload: {
        name: Joi.string().required(),
        provence: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.object().required()
      },
      failAction: function (request, h, error) {
        return h
            .view('home', {
              title: 'Add Island error',
              errors: error.details
            })
            .takeover()
            .code(400);
      },
    },
    handler: async function (request, h) {
      try {
        const {payload} = request;

        var image_url;
        if (Object.keys(payload.image).length > 0) {
          image_url = await ImageStore.uploadIslandImage(payload.image);
        }
        console.log(image_url);
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        const data = payload;
        const newIsland = new Island({
          name: data.name,
          provence: data.provence,
          description: data.description,
          image: image_url,
          user: user._id,
        });
        await newIsland.save();
        return h.redirect("/report");
      } catch (err) {
        return h.view("main", {errors: [{message: err.message}]});
      }
    },
    payload: {
      multipart: true,
      output: "data",
      maxBytes: 209715200,
      parse: true,
    },
  },
};

module.exports = Islands;