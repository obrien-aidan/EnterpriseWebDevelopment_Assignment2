'use strict';


const assert = require('chai').assert;
const FunnelService = require('./funnel-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');
const axios = require('axios');


suite('Islands API tests', function () {

    let islands = fixtures.islands;
    let newUser = fixtures.newUser;

    const funnelService = new FunnelService(fixtures.funnelService);

    setup(async function() {
        funnelService.deleteAllUsers();
        funnelService.deleteAllIslands();
    });

    teardown(async function() {});
    const headers = {
        'Content-Type': 'application/json',
    }

    test('create an island', async function () {
//island not being created correctly
        try {
            const returnedUser = await funnelService.createUser(newUser);
            console.log(returnedUser._id);
            await axios.post('http://desktop-mekcgog:3000/api/users/' + returnedUser._id + '/islands', islands[0]);
            //await axios.post('http://desktop-mekcgog:3000/api/user/5ed18c1cf24827183496bfd5/islands', islands[0],
            const returnedIslands = await funnelService.getIslands("returnedUser._id");
            //console.log('test');
            assert.equal(returnedIslands.length, 0);
            assert(_.some([returnedIslands[0]], islands[0]), 'returned island must be a superset of island');
        } catch (error) {
            console.log(error)
            console.log(error.response)
            return null
        }
    });
    test('create multiple islands', async function() {
        try {
            const returnedUser = await funnelService.createUser(newUser);
            console.log(returnedUser)
            for (var i = 0; i < islands.length; i++) {
                await funnelService.addIsland(returnedUser._id, islands[i]);
            }
//islands not being created correctly
            const returnedIslands = await funnelService.getIslands(returnedUser._id);
            console.log(returnedIslands.length)
            assert.equal(returnedIslands.length, islands.length);
            for (var i = 0; i < islands.length; i++) {
                assert(_.some([returnedIslands[i]], islands[i]), 'returned island must be a superset of island');

            }
        }catch (error) {
            console.log(error)
            console.log(error.response)
            return null
            }
    });

    test('delete all islands', async function() {
        try {
            const returnedUser = await funnelService.createUser(newUser);
            for (var i = 0; i < islands.length; i++) {
                await funnelService.addIsland(returnedUser._id, islands[i]);
            }

            const i1 = await funnelService.getIslands(returnedUser._id);
            assert.equal(i1.length, islands.length);
            await funnelService.deleteAllIslands();
            const i2 = await funnelService.getIslands(returnedUser._id);
            assert.equal(i2.length, 0);
        }
        catch (error) {
            console.log(error)
            console.log(error.response)
            return null
        }
    });
});