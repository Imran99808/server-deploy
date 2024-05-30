'use strict';

const hasLove=require('../../../lib/hasSomthink')
/**
 * wish-list controller
 */

function uptodelete(arr,data){
    const innerArray=[];
    let check=true;
    for(let i=0;i<arr.length;i++){

        if(arr[i].id===data.id){
           check=false;
            continue;
        }
        innerArray.push(arr[i])
    }

    check&&innerArray.push(data);


    return innerArray;


}

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wish-list.wish-list',({strapi})=>({

  async find(ctx){

    try{
      if(!ctx.userId&&!ctx.email){
        throw new  Error();
        }
        const s=ctx.query;
        

      const user1=await strapi.query('api::wish-list.wish-list').findOne({ where:{email:`${ctx.email}`}, populate:['products.img','products.wish_lists']});
      const data= hasLove(user1.products,ctx.email);
       
 ctx.body={
  data:data
 }

    }catch(e){
      
    ctx.body={
      message:e
    }


  }
  },
   async create(ctx){

  let info='create';

    try{
        if(!ctx.userId&&!ctx.email){
            throw new  Error();
            }
       const{id,productData}=ctx.request.body;
       const{ title, price, discountPrice, specifications, features,  descripetion,stock, createdAt, updatedAt, publishedAt, name,img}=productData
      
       const pdata={id, title, price, discountPrice, specifications , features,  descripetion,stock, createdAt, updatedAt, publishedAt, name}
      
    

       const user=await strapi.query('api::wish-list.wish-list').findOne({ where:{email:`${ctx.email}`}, populate:{products:true} });
       if(!user){
        await strapi.db.query('api::wish-list.wish-list').create(
            {
              data:{
               email:ctx.email,
               products:[pdata]
              }
            }
          )
            
          
       }else{

    
   
  const updata=uptodelete(user.products,pdata)

    
await strapi.db.query('api::wish-list.wish-list').update({ where:{email:`${ctx.email}`},  data:{products:updata} });

info='update'

       }

      
    //    const user1=await strapi.query('api::wish-list.wish-list').findOne({ where:{email:`${ctx.email}`}, populate:{products:true} });
    //  console.log(user1)
  ctx.body={
    data:info,

}

    }catch(e){
       

        ctx.body={
            message:e
        }
    }

    }


}));
