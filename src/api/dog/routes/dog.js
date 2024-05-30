const admin = require("../../../../config/admin");

module.exports = {
  routes: [
    {
     method: 'POST',
     path: '/google/auth',
     handler: 'dog.googleAuth',
     config: {
       policies: [],
       middlewares: [],
     },
    },





    {
      method: 'GET',
      path: '/auth/google/callback',
      handler: 'dog.googleCallback',
      config: {
        policies: [],
        middlewares: [],
      },
     },
  ],

};
