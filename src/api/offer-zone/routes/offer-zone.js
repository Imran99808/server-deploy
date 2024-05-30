'use strict';

/**
 * offer-zone router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::offer-zone.offer-zone',{
    config:{
        find:{
            middlewares:['global::authenticate']
        }
    }
  });
