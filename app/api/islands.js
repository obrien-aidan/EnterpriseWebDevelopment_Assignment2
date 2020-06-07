'use strict';
const User = require('../models/user');
const Island = require('../models/islands');
const Boom = require('@hapi/boom');
const utils = require('./utils')

const Islands = {
    findAll: {
        auth: {
            strategy: 'jwt',
        },
        handler: async function(request, h) {
            const islands = await Island.find();
            return islands;
        }
    },
    findByUser: {
        auth: {
            strategy: 'jwt',
        },
        handler: async function(request, h) {
            const islands = await Island.find({ user: request.params.id });
            return islands;
        }
    },
    addIsland: {
        auth: {
            strategy: 'jwt',
        },
        handler: async function(request, h) {
            //const userId = utils.getUserIdFromRequest(request);
            let island = new Island(request.payload);
            const user = await User.findOne({ _id: request.params.id });
            island.user = userId;

            if (!user) {
                return Boom.notFound('No user with this id');
            }
            island.user = userId;
            island = await island.save();
            return island;
        }
    },
    deleteAll: {
        auth: {
            strategy: 'jwt',
        },
        handler: async function(request, h) {
            await Island.deleteMany({});
            return { success: true };
        }
    }
};

module.exports = Islands;