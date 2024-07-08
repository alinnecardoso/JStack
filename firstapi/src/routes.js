const userController = require('./Controllers/UserController');

module.exports = [
  {
    endpoint: '/users',
    method: 'GET',
    handler: userController.listUsers, //routes[0].handler(request, response);
  },
  {
    endpoint: '/users/:id',
    method: 'GET',
    handler: userController.getUserById, //routes[0].handler(request, response);
  },
  {
    endpoint: '/users',
    method: 'POST',
    handler: userController.createUser, //routes[0].handler(request, response);
  },
];

