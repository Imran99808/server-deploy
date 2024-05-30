'use strict';

/**
 * review router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::review.review',{
    config:{
        find:{
            middlewares:['global::authenticate']
        },
        findOne:{
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





