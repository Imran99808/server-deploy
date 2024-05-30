'use strict';




/**
 * product router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::product.product');

  module.exports={
    routes: [
      {
        method: 'GET',
        path: '/products',
        handler: 'product.find',
        config: {
          policies: [],
          middlewares: ['global::authenticate'],
        },
       },
        {
         method: 'GET',
         path: '/products/:name',
         handler: 'product.findOne',
         config: {
           policies: [],
           middlewares: ['global::authenticate'],
         },
        },

        {
          method: 'GET',
          path: '/search',
          handler: 'product.search',
          config: {
            
            policies: [],
            middlewares: [],
          },
         },
    ]
  }