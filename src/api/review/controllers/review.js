'use strict';

/**
 * review controller
 */


const findMe=(data,email)=>{
   
    for(let i=0;i<data.length;i++){
        
        if(data[i].email===email){
            data[i].me=true;
            break;
        }
    }
}

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::review.review',({strapi})=>({
    async findOne(ctx){

       try{
        

            const {id}=ctx.params;
            const s=ctx.query;
     
          


            const data=await strapi.db.query('api::review.review').findMany({ orderBy:{id:'DESC'}, where:{productId:id}, limit:`${s.limit}` })

           findMe(data,ctx.email)
          

        

            ctx.body={
                data:data,
            }

       }catch(e){
         
      
 
         ctx.body={
             message:e
         }

       }

    },
    async create(ctx){
        let data=false;
 
 
     try{
     
         if(!ctx.userId&&!ctx.email){
             throw new  Error('unAuthorized');
             }
             const{count,tValue,id}= ctx.request.body;
            
             let star=parseInt(count);
             const hasData=await strapi.db.query('api::review.review').findOne({where:{email:`${ctx.email}`,productId:id}})
             const data1=  await strapi.db.query('api::product.product').findOne({where:{id}});
             data1.star=data1.star===null?0:data1.star;
             data1.reviewCount=data1.reviewCount===null?0:data1.reviewCount;
           
   

             if(!hasData){

                await strapi.db.query('api::review.review').create({
                    
                        data:{
                            email:ctx.email,
                            profile:ctx.profile,
                            rating:count,
                            comment:tValue,
                             productId: id
                
                         
                        }
                      
                });

                count&&data1.reviewCount++;
             }else{
                star-=hasData.rating
                await strapi.db.query('api::review.review').update({
                    
                    where:{email:`${ctx.email}`, productId:id},
                    
                    data:{
                        rating:count,
                        comment:tValue
                     
                    }
                    
                } 
                    )

            }
const a=data1.star+star;
           
          await  strapi.db.query('api::product.product').update({where:{id},data:{star:data1.star+star, reviewCount:data1.reviewCount}});       
          
  
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

