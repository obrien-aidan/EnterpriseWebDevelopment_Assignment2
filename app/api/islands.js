'use strict';
const User = require('../models/user');
const Island = require('../models/islands');
const Boom = require('@hapi/boom');

const Islands = {
    findAll: {
        auth: false,
        handler: async function(request, h) {
            const islands = await Island.find();
            return islands;
        }
    },
    findByUser: {
        auth: false,
        handler: async function(request, h) {
            const islands = await Island.find({ user: request.params.id });
            return islands;
        }
    },
    addIsland: {
        auth: false,
        handler: async function(request, h) {
            let island = new Island(request.payload);
            const user = await User.findOne({ _id: request.params.id });
            if (!user) {
                return Boom.notFound('No user with this id');
            }
            island.user = user._id;
            island = await island.save();
            return island;
        }
    },
    deleteAll: {
        auth: false,
        handler: async function(request, h) {
            await Island.deleteMany({});
            return { success: true };
        }
    }
};

module.exports = Islands;