'use strict';

/**
 * add-card router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::add-card.add-card',{
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
  
  
 