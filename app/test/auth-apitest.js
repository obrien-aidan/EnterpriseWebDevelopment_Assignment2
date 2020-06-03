'use strict';

const assert = require('chai').assert;
const FunnelService = require('./funnel-service');
const fixtures = require('./fixtures.json');
const utils = require('C:\\Users\\Aidan\\Documents\\eWebDev_Ass2\\0\\app\\api\\utils.js');
//const utils = require('../app/api/utils.js');


suite('Authentication API tests', function () {

    let users = fixtures.users;
    let newUser = fixtures.newUser;

    const funnelService = new FunnelService(fixtures.funnelService);

    setup(async function () {
        await funnelService.deleteAllUsers();
    });

    test('authenticate', async function () {
        const returnedUser = await funnelService.createUser(newUser);
        const response = await funnelService.authenticate(newUser);
        console.log(newUser)
        assert(response.success);
        assert.isDefined(response.token);
    });

    test('verify Token', async function () {
        const returnedUser = await funnelService.createUser(newUser);
        const response = await funnelService.authenticate(newUser);
        console.log(newUser)

        const userInfo = utils.decodeToken(response.token);
        assert.equal(userInfo.email, returnedUser.email);
        assert.equal(userInfo.userId, returnedUser._id);
    });
});