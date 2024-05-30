'use strict';

/**
 * add-card controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::add-card.add-card',({strapi})=>({
    async find(ctx){
        

         try{
            if(!ctx.userId&&!ctx.email){
                throw new  Error('unauthorize');
                } 


           
                const card=await strapi.query('api::add-card.add-card').findMany({ where:{email:`${ctx.email}`}, populate:{products:true} }); 
                const products=[]
                for(let i=0;i<card.length;i++){
                const product=await strapi.query('api::product.product').findOne({ where:{id:`${card[i].product_id}`}, populate:{products:true,color:true,img:true} });  
                 product.color=product.color[card[i].color_index];
                 product.qty=card[i].qty;
                    
                products.push(product);

                }
             
           console.log(products)  ;   
                 
   ctx.body={
    data:products  
}

        
        } catch(e){
          
            console.log(e)  ;  
            ctx.body={
                message:e
            }
        }
    
              
    },
    async create(ctx){
        let data=false;
 
 
     try{
         if(!ctx.userId&&!ctx.email){
             throw new  Error();
             }
             const{id,colorIndex,qt}= ctx.request.body;

             const product=await strapi.db.query('api::add-card.add-card').findOne({ where:{email:`${ctx.email}`,product_id:`${id}`,color_index:`${colorIndex}`}, populate:{products:true} });

             if(!product){
         await strapi.db.query('api::add-card.add-card').create(
             {
               data:{
                email:ctx.email,
                product_id:id,
                color_index:colorIndex,
                qty:qt
               }
             }
           )
             data=true;
           } 
   
           
   ctx.body={
     data:'okk',
 }
 
     }catch(e){
        
 
         ctx.body={
             message:e
         }
     }
 
     },

     async delete(ctx){

        try{
            const {id}=ctx.params;
            const arr=id.split('');
           const arr2= arr.slice(1);
     
            console.log(arr2.toString())
           await strapi.db.query('api::add-card.add-card').delete({where:{email:`${ctx.email}`,product_id:`${arr2.toString()}`}});
         
            ctx.body={
                data:'okk',
            } 

        }catch(e){
            ctx.body={
                message:e
            }
        }
     }
 
 
 }));
  
