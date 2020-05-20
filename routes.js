//For Signup and Login Users
const Accounts = require("./app/controllers/accounts");
//Add New Island and View Reports of Islands
const Islands = require("./app/controllers/islands");
//For Uploading & Displaying Images by using Cloudinary
//const Gallery = require("./app/controllers/gallery");

module.exports = [
  { method: "GET", path: "/", config: Accounts.index },
  { method: "GET", path: "/signup", config: Accounts.showSignup },
  { method: "GET", path: "/login", config: Accounts.showLogin },
  { method: "GET", path: "/logout", config: Accounts.logout },
  { method: "POST", path: "/signup", config: Accounts.signup },
  { method: "POST", path: "/login", config: Accounts.login },
  { method: 'GET', path: '/settings', config: Accounts.showSettings },
  { method: 'POST', path: '/settings', config: Accounts.updateSettings },

  { method: "GET", path: "/home", config: Islands.home },
  { method: "GET", path: "/report", config: Islands.report },

  {
    method: "POST",
    path: "/addIsland",
    config: Islands.addIsland,
  },

  {
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: "./public",
      },
    },
    options: { auth: false },
  },
];
