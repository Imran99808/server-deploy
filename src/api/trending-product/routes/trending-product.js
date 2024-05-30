'use strict';

/**
 * trending-product router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::trending-product.trending-product',{
    config:{
        find:{
            middlewares:['global::authenticate']
        }
    }
  });
