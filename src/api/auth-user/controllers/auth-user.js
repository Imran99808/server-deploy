'use strict';

/**
 * auth-user controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::auth-user.auth-user',({strapi})=>({

    async find( ctx){
        try{
            const user=await strapi.db.query('api::auth-user.auth-user').findOne({ where:{sub:`${ctx.userId}`,email:`${ctx.email}`}});
           
             ctx.body={
               name:user.name,
               email:user.email,
               img:user.image
             };
            
         
          
        }catch(error){




          
          ctx.status=401;
          ctx.body={
            massage:'unauthorized'
          }
          
        }
    }



}));
