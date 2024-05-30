'use strict';

/**
 * categorie router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::categorie.categorie');




  module.exports={
    routes: [
      {
        method: 'GET',
        path: '/categories',
        handler: 'categorie.find',
        config: {
          policies: [],
          middlewares: ['global::authenticate'],
        },
       },
        {
         method: 'GET',
         path: '/categorie',
         handler: 'categorie.findOne',
         config: {
           policies: [],
           middlewares: ['global::authenticate'],
         },
        },

    ]
  }