'use strict';
const hasLove=require('../../../lib/hasSomthink');
const product = require('../../product/controllers/product');

/**
 * categorie controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::categorie.categorie',({strapi})=>({
   
  async find(ctx) {
   
    try{

   
         const s=ctx.query;
     
      
     
        const result=await strapi.entityService.findMany('api::categorie.categorie',s)
      
      
       return {
         data: result  
       };
     
     
    }catch(e){
      ctx.status=500;
      ctx.body={
          m:e
      }

    }
  },

  async findOne(ctx){

    try{
      const s=ctx.query;
     
     
     
     
      const result=await strapi.entityService.findMany('api::categorie.categorie',s);

      const data=hasLove(result[0].products,ctx.email);
      result[0].products=data
  

      return{
        data:result[0]
      }

    }catch(e){
      ctx.status=500;
      return{
        error:e
      }
    }
  }

}));

