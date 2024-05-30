'use strict';

/**
 * customer-adress router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::customer-adress.customer-adress',{
    config:{
        find:{
            middlewares:['global::authenticate']
        },
        create:{
            middlewares:['global::authenticate']
        },
        delete:{
             middlewares:['global::authenticate']
        }
    }
  });
