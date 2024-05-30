'use strict';
const hasLove=require('../../../lib/hasSomthink')

/**
 * offer-zone controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::offer-zone.offer-zone',({strapi})=>({
   
    async find(ctx) {
     
      try{

     
        const s=ctx.query;
     
      
        
     
        const result=await strapi.entityService.findMany('api::offer-zone.offer-zone',s)
         console.log(result);
      
         const qresult=result[0].products
         const data= hasLove(qresult,ctx.email);
     
         
        
         return {
            data  
         };
        
       
      }catch(e){
        
        ctx.body={
            m:e
        }

      }
    }

}));

