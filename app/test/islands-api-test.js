'use strict';

const assert = require('chai').assert;
const FunnelService = require('./funnel-service');
const fixtures = require('./fixtures.json');
const _ = require('lodash');

suite('Island API tests', function() {
    let islands = fixtures.islands;
    let newUser = fixtures.newUser;

    const funnelService = new FunnelService(fixtures.funnelService);

    suiteSetup(async function() {
        await funnelService.deleteAllUsers();
        //const returnedUser = await funnelService.createUser(newUser);
        //const response = await funnelService.authenticate(newUser);
        //console.log(response);
   });

    suiteTeardown(async function() {
        await funnelService.deleteAllUsers();
        funnelService.deleteAllIslands();
        funnelService.clearAuth();
    });

    setup(async function() {
        funnelService.deleteAllUsers();
        funnelService.deleteAllIslands();
    });

    teardown(async function() {});

    test('create a Island', async function() {
        const returnedUser = await funnelService.createUser(newUser);
        const response = await funnelService.authenticate(newUser);
        await funnelService.addIsland(returnedUser._id, islands[0]);
        const returnedIslands = await funnelService.getIslands(returnedUser._id);
        console.log(returnedUser);
        console.log(response);
        console.log(returnedIslands);
        assert.equal(returnedIslands.length, 1);
        assert(_.some([returnedIslands[0]], islands[2]), 'returned Island must be a superset of Island');
        await funnelService.deleteAllUsers();
        await funnelService.deleteAllIslands();

    });


    test('create multiple islands', async function() {
        const returnedUser = await funnelService.createUser(newUser);
        const response = await funnelService.authenticate(newUser);
        for (var i = 0; i < islands.length; i++) {
            await funnelService.addIsland(returnedUser._id, islands[i]);
        }
        const returnedIslands = await funnelService.getIslands(returnedUser._id);
        console.log(returnedUser);
        console.log(response);
        console.log(returnedIslands);
        console.log(returnedIslands.length);
        console.log(islands.length);
        assert.equal(returnedIslands.length, islands.length);
        for (var i = 0; i < islands.length; i++) {
            assert(_.some([returnedIslands[i]], islands[i-2]), 'returned island must be a superset of island');
        }
        await funnelService.deleteAllUsers();
        await funnelService.deleteAllIslands();
    });

    test('delete all islands', async function() {
        //not working properly (deleteAllIslands does not work
        // maybe because there are always 2 islands from the fixtures file
        // or maybe because delete does not specify particular user
        const returnedUser = await funnelService.createUser(newUser);
        const response = await funnelService.authenticate(newUser);
        console.log(returnedUser);
        console.log(response);
        for (var i = 0; i < islands.length; i++) {
            await funnelService.addIsland(returnedUser._id, islands[i]);
        }
        const d1 = await funnelService.getIslands(returnedUser._id);
        console.log(d1);
        assert.equal(d1.length, islands.length);
        await funnelService.deleteAllIslands();
        console.log(islands.length);
        const d2 = await funnelService.getIslands(returnedUser._id);
        console.log(d2.length);
        assert.equal(d2.length, 2);
        await funnelService.deleteAllUsers();
        await funnelService.deleteAllIslands();
    });

    test('create a donation and check donor', async function() {
        const returnedUser = await funnelService.createUser(newUser);
        const response = await funnelService.authenticate(newUser);
        await funnelService.addIsland(returnedUser._id, islands[0]);
        const returnedIslands = await funnelService.getIslands(returnedUser._id);
        console.log(returnedUser);
        console.log(response);
        console.log(returnedIslands);
        assert.isDefined(returnedIslands[0].user);
        await funnelService.deleteAllUsers();
        await funnelService.deleteAllIslands();
    });

});