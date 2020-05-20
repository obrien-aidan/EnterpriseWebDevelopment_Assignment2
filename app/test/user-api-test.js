'use strict';

const assert = require('chai').assert;
const axios = require('axios');


suite('User API tests', function () {

    test('get users', async function () {
        const response = await axios.get('http://localhost:3000/api/users');
        const users = response.data;
        assert.equal(3, users.length);

    });
});