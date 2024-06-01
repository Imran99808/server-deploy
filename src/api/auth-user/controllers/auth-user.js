'use strict';
const jwt=require('jsonwebtoken');
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

const tokenInfo={
            userId:'s',
            email:'r',
            image:'s'
          }
          const token=jwt.sign(tokenInfo,'ondex');
         
          ctx.cookies.set('jwt',token, {
            httpOnly: true,
            // secure: true,
             maxAge: 1000 * 60 * 60 * 24 * 14, // 14 Day Age
             domain:'.client-deploy-rho.vercel.app',
            // sameSite: "none",
            overwrite: true,
          });
      



          
          ctx.status=401;
          ctx.body={
            massage:'unauthorized'
          }
          
        }
    }



}));
