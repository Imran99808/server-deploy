'use strict';
const hasLove=require('../../../lib/hasSomthink')
/**
 * trending-product controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::trending-product.trending-product',({strapi})=>({
   
    async find(ctx) {
     
      try{

        const s=ctx.query;
     
        
     
        const result=await strapi.entityService.findMany('api::trending-product.trending-product',s)
         
      
         const qresult=result[0].products
        
         const data= hasLove(qresult,ctx.email);
     
         ctx.body= {
            data  
         };
        
       
      }catch(e){
         
        ctx.body={
            m:e
        }

      }
    }

}));


