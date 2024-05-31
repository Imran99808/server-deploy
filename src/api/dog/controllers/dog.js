'use strict';

const fetch=require('node-fetch');
const queryString=require('querystring');
const jwt=require('jsonwebtoken');

/**
 * A set of functions called "actions" for `dog`
 */console
let data=[];
const cartStore=async(ctx,cartData)=>{
 const {id,colorIndex,qty}=cartData

  const product=await strapi.db.query('api::add-card.add-card').findOne({ where:{email:`${ctx.email}`,product_id:`${id}`,color_index:`${colorIndex}`}, populate:{products:true} });

  if(!product){
await strapi.db.query('api::add-card.add-card').create(
  {
    data:{
     email:ctx.email,
     product_id:id,
     color_index:colorIndex,
     qty:qty
    }
  }
)
  
} 










}
// ......................
const wtoken=async(code)=>{

  const tokenEndpoint='https://oauth2.googleapis.com/token'
  const body=queryString.stringify({
     
    client_id:process.env.CLIENT_ID_MY,
    client_secret:process.env.CLIENT_SECRET_MY,
    code,
    grant_type:'authorization_code',
    redirect_uri:'https://server-deploy-6984.onrender.com/api/auth/google/callback'
              
  })

  const tokenResponse=await fetch(tokenEndpoint,{
    method:'POST',
    headers:{
      'Content-Type':'application/x-www-form-urlencoded'
    },
    body
  });


  
  return tokenResponse;

}

module.exports = {
 async googleAuth(ctx ){
    try {
    
     const authUrl='https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?'
const{state,values}= ctx.request.body;
data=values;

    const body=queryString.stringify({
      client_id:process.env.CLIENT_ID_MY,
      response_type:'code',
      redirect_uri:'https://server-deploy-6984.onrender.com/api/auth/google/callback',
      scope:'email profile',
      state:state,
     
      
    })


  
//  ctx.redirect(authUrl+ body)
ctx.body={
   url:authUrl+ body
}
 
  
    
    } catch (err) {
      ctx.body = err;
    }
  },






  async googleCallback(ctx ){
    try {
     
      const {state}=ctx.request.query;
    
   
  //  ctx.body='ami'
     const tokenResponse= await wtoken(ctx.query.code)
     if(!tokenResponse.ok){
      ctx.body='auth error'
     }
     const tokenData= await tokenResponse.json();
     const userInfoEndpoint='https://www.googleapis.com/oauth2/v3/userinfo'
     const userInfoResponse= await fetch(userInfoEndpoint,{
      headers:{
      Authorization:`Bearer ${tokenData.access_token}`
      }
     })

     if(!userInfoResponse.ok){
      ctx.body='error'
     }
     const userData= await userInfoResponse.json();
      console.log(userData)
      const tokenInfo={
        userId:userData.sub,
        email:userData.email,
        image:userData.picture
      }
      const token=jwt.sign(tokenInfo,'ondex');
     
      ctx.cookies.set('jwt',token, {
        httpOnly: true,
         secure: true,
         maxAge: 1000 * 60 * 60 * 24 * 14, // 14 Day Age
         domain:"https://client-deploy-rho.vercel.app",
         sameSite: "none",
        overwrite: true,
      });
  

        const user=await strapi.db.query('api::auth-user.auth-user').findOne({ where:{sub:`${userData.sub}`}});

        if(!user){
      await strapi.db.query('api::auth-user.auth-user').create(
        {
          data:{
            sub:userData.sub,
            name:userData.name,
            email:userData.email,
            image:userData.picture
          }
        }
      )
        }
      


      ctx.redirect(state);
      

console.log(',,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,')

for(let i=0;i<data.length;i++){
   cartStore(userData,data[i]);
   
}
      
      
    
    } catch (err) {
      ctx.body = err;
    }
  }
};


