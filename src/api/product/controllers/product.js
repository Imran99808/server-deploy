'use strict';
const Fuse=require('fuse.js')
const hasLove=require('../../../lib/hasSomthink');
const { keys } = require('../../../../config/middlewares');

/**
 * product controller
 */


const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product.product',({strapi})=>({
   
    async find(ctx) {
     
     try{
    
        const s=ctx.query;
    
     
        const result=await strapi.entityService.findMany('api::product.product',s);
        
         const data= hasLove(result,ctx.email);
       
       
         return {
          data
         }
       
      }catch(e){
      
         ctx.status=500
        ctx.body={
            m:e
        }

      }
    },
   async findOne(ctx){

    try{
     

      const {name}=ctx.params

      const data1=await strapi.db.query('api::product.product').findOne({where:{name:name}, populate:{category:true,img:true,color:true,wish_lists:true }})
      
      const data= hasLove([data1],ctx.email);
     
      
      return{
        data
      }

    }catch(e){
   
    ctx.body={
      m:e
  }
}

   },

   async search(ctx){

    try{
     const {name}=ctx.query;
     const data=await super.find(ctx);
     const products=data.data;
     
     const fuse=new Fuse(products,{keys:['attributes.name']}) ;
     const searchData=fuse.search(name)
       
     
       return searchData;
    }catch(e){
      
      ctx.body={
        m:e
      }
    }
   }

}));
