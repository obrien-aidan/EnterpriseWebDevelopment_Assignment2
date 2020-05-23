const Users= require('./app/api/users');
const Islands= require('./app/api/islands');

module.exports = [

{ method: 'GET', path: '/api/users', config: Users.find },
{ method: 'GET', path: '/api/users/{id}', config: Users.findOne },
{ method: 'POST', path: '/api/users', config: Users.create },
{ method: 'DELETE', path: '/api/users/{id}', config: Users.deleteOne },
{ method: 'DELETE', path: '/api/users', config: Users.deleteAll },

{ method: 'GET', path: '/api/islands', config: Islands.findAll },
{ method: 'GET', path: '/api/users/{id}/islands', config: Islands.findByUser },
{ method: 'POST', path: '/api/user/{id}/islands', config: Islands.addIsland }


];
