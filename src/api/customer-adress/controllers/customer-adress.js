'use strict';

/**
 * customer-adress controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::customer-adress.customer-adress',({strapi})=>({
    async find(ctx){


        
     try{
        if(!ctx.userId&&!ctx.email){
            throw new  Error();
            }
           
            const data=await strapi.db.query('api::customer-adress.customer-adress').findOne({where:{email:`${ctx.email}`}});

          
  
  ctx.body={
    data:data,
}

    }catch(e){
        console.log()
 console.log(e)

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
             const{name,phone,division,district,address,subDistrict,locationName}= ctx.request.body;

             const hasData=await strapi.db.query('api::customer-adress.customer-adress').findOne({where:{email:`${ctx.email}`}})

             if(!hasData){

                await strapi.db.query('api::customer-adress.customer-adress').create({
                    
                        data:{
                            name,
                            phone,
                            division,
                            district,
                            subDistrict,
                            address,
                            locationName,
                            email:ctx.email,
                         
                        }
                      
                });
             }else{
                await strapi.db.query('api::customer-adress.customer-adress').update({
                    
                    where:{email:`${ctx.email}`},
                    
                    data:{
                        name,
                        phone,
                        division,
                        district,
                        subDistrict,
                        address,
                        locationName,
                        email:ctx.email,
                     
                    }
                    
                } 
                    )

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





}));
