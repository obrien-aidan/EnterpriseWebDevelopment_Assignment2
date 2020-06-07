const User = require("../models/user");
const Boom = require("@hapi/boom");
const Joi = require("@hapi/joi");

const Accounts = {
  //MAIN SCREEN
  index: {
    auth: false,
    handler: function(request, h) {
      return h.view("main", { title: "Welcome to Islands" });
    },
  },
  //SIGNUP PAGE
  showSignup: {
    auth: false,
    handler: function(request, h) {
      return h.view("signup", { title: "Sign up for Islands" });
    },
  },
  //SIGNUP
  signup: {
    auth: false,
    validate: {
      payload: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string()
          .email()
          .required(),
        password: Joi.string().required(),
      },
      options: {
        abortEarly: false,
      },
      failAction: function(request, h, error) {
        return h
          .view("signup", {
            title: "Sign up error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function(request, h) {
      try {
        const payload = request.payload;
        let user = await User.findByEmail(payload.email);
        if (user) {
          const message = "Email address is already registered";
          throw Boom.badData(message);
        }
        const newUser = new User({
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          password: payload.password,
        });
        user = await newUser.save();
        request.cookieAuth.set({ id: account.id });
        return h.redirect("/home");
      } catch (err) {
        return h.view("signup", { errors: [{ message: err.message }] });
      }
    },
  },
  //Show Login Page
  showLogin: {
    auth: false,
    handler: function(request, h) {
      return h.view("login", { title: "Login to Islands" });
    },
  },
  //LOGIN
  login: {
    auth: false,
    validate: {
      payload: {
        email: Joi.string()
          .email()
          .required(),
        password: Joi.string().required(),
      },
      failAction: function(request, h, error) {
        return h
          .view("login", {
            title: "Login in error",
            errors: error.details,
          })
          .takeover()
          .code(400);
      },
    },
    handler: async function(request, h) {
      const { email, password } = request.payload;
      try {
        let user = await User.findByEmail(email);
        if (!user) {
          const message = "Email address is not registered";
          throw Boom.unauthorized(message);
        }
        user.comparePassword(password);
        request.cookieAuth.set({ id: user.id });
        return h.redirect("/home");
      } catch (err) {
        return h.view("login", { errors: [{ message: err.message }] });
      }
    },
  },
  //LOGOUT
  logout: {
    auth: false,
    handler: function(request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },
  showSettings: {
    handler: async function(request, h) {
      try {
        const id = request.auth.credentials.id;
        const user = await User.findById(id).lean();
        return h.view('settings', { title: 'User Settings', user: user });
      } catch (err) {
        return h.view('login', { errors: [{ message: err.message }] });
      }
    }
  },
  updateSettings: {
    validate: {
      payload: {
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string().required()
      },
      options: {
        abortEarly: false
      },
      failAction: function(request, h, error) {
        return h
            .view('settings', {
              title: 'Sign up error',
              errors: error.details
            })
            .takeover()
            .code(400);
      }
    },
    handler: async function(request, h) {
      try {
        const userEdit = request.payload;
        const id = request.auth.credentials.id;
        const user = await User.findById(id);
        user.firstName = userEdit.firstName;
        user.lastName = userEdit.lastName;
        user.email = userEdit.email;
        user.password = userEdit.password;
        await user.save();
        return h.view('settings', { update: [{ message: "settings updated" }] });
      } catch (err) {
        return h.view('main', { errors: [{ message: err.message }] });
      }
    }
  }

};

module.exports = Accounts;
