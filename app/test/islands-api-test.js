'use strict';

const assert = require('chai').assert;
const FunnelService = require('./funnel-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('Islands API tests', function () {

    let islands = fixtures.islands;
    let newUser = fixtures.newUser;

    const funnelService = new FunnelService(fixtures.funnelService);

    setup(async function() {
        funnelService.deleteAllUsers();
        funnelService.deleteAllIslands();
    });

    teardown(async function() {});

    test('create an island', async function() {
        const returnedUser = await funnelService.createUser(newUser);
        await funnelService.addIsland(returnedUser._id, islands[0]);
        const returnedIslands = await funnelService.getIslands(returnedUser._id);
        console.log(islands);
        assert.equal(returnedIslands.length, 1);
        assert(_.some([returnedIslands[0]], islands[0]), 'returned island must be a superset of island');
    });

    test('create multiple islands', async function() {
        const returnedUser = await funnelService.createUser(newUser);
        for (var i = 0; i < islands.length; i++) {
            await funnelService.addIsland(returnedUser._id, islands[i]);
        }

        const returnedIslands = await funnelService.getIslands(returnedUser._id);
        assert.equal(returnedIslands.length, islands.length);
        for (var i = 0; i < islands.length; i++) {
            assert(_.some([returnedIslands[i]], islands[i]), 'returned island must be a superset of island');
        }
    });

    test('delete all islands', async function() {
        const returnedUser = await funnelService.createUser(newUser);
        for (var i = 0; i < islands.length; i++) {
            await funnelService.addIsland(returnedUser._id, islands[i]);
        }

        const i1 = await funnelService.getIslands(returnedUser._id);
        assert.equal(i1.length, islands.length);
        await funnelService.deleteAllIslands();
        const i2 = await funnelService.getIslands(returnedUser._id);
        assert.equal(i2.length, 0);
    });
});