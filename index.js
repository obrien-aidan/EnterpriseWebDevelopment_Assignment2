//To upload or to retrieve data from cloudinary
const ImageStore = require("./app/models/image-store");
//Like Express JS, Hapi is another framework of Node JS
const Hapi = require("@hapi/hapi");
require("dotenv").config();

const server = Hapi.server({
  port: process.env.PORT || 3000,
});

require("./app/models/db");

//Cloudinary Account Assets that we use for deploying static assets
const credentials = {
  cloud_name: process.env.name,
  api_key: process.env.key,
  api_secret: process.env.secret,
};

async function init() {
  //for serving static content
  await server.register(require("@hapi/inert"));
  //designed to work seamlessly with hapi
  await server.register(require("@hapi/vision"));
  //to keep state about a user between requests
  await server.register(require("@hapi/cookie"));

  //Hapi Joi is an object schema description language and validator for JavaScript objects.
  server.validator(require("@hapi/joi"));

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.cookie_name,
      password: process.env.cookie_password,
      isSecure: false,
    },
    redirectTo: "/",
  });

  server.auth.default("session");
  ImageStore.configure(credentials);

  //To include the view for managing I/O operations
  server.views({
    engines: {
      hbs: require("handlebars"),
    },
    relativeTo: __dirname,
    path: "./app/views",
    layoutPath: "./app/views/layouts",
    partialsPath: "./app/views/partials",
    layout: true,
    isCached: false,
  });

  //Include all the routers that should be implemented in our complete app
  server.route(require("./routes"));

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

//Node JS Process
process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
