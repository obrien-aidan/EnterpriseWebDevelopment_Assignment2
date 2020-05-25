'use strict';

const axios = require('axios');

class FunnelService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async getUsers() {
        try {
            const response = await axios.get(this.baseUrl + '/api/users');
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async getUser(id) {
        try {
            const response = await axios.get(this.baseUrl + '/api/users/' + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async createUser(newUser) {
        try {
            const response = await axios.post(this.baseUrl + '/api/users', newUser);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async deleteAllUsers() {
        try {
            const response = await axios.delete(this.baseUrl + '/api/users');
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async deleteOneUser(id) {
        try {
            const response = await axios.delete(this.baseUrl + '/api/users/' + id);
            return response.data;
        } catch (e) {
            return null;
        }
    }
    async addIsland(id, island) {
        try {
            const response = await axios.post(this.baseUrl + '/api/users/' + id + '/islands', island);
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async getIslands(id) {
        try {
            const response = await axios.get(this.baseUrl + '/api/users/' + id + '/islands');
            return response.data;
        } catch (e) {
            return null;
        }
    }

    async deleteAllIslands() {
        try {
            const response = await axios.delete(this.baseUrl + '/api/islands');
            return response.data;
        } catch (e) {
            return null;
        }
    }

}

module.exports = FunnelService;