'use strict';

/**
 * auth-user router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::auth-user.auth-user',{
    config:{
        find:{
            middlewares:['global::authenticate']
        }
    }
  });
