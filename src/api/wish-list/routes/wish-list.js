'use strict';

/**
 * wish-list router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::wish-list.wish-list',{
  config:{
    find:{
      middlewares:['global::authenticate']
  },
      create:{
          middlewares:['global::authenticate']
      }
  }
});






































// module.exports = {
//     routes: [
//       {
//        method: 'POST',
//        path: '/wish-lists',
//        handler: 'wish-list.create',
//        config: {
//          policies: [],
//          middlewares: ['global::authenticate'],
//        },
//       },
  
//     ]
  
// }  