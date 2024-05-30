'use strict';

const jwt=require('jsonwebtoken');

function cookieParser(value){
const obj={}

const aValue=value.split(';')


for(let i=0;i<aValue.length;i++){
  let key='',v='',count=0;
   let index=aValue[i];
  for(let j=0;j<index.length;j++){
    // index.charAt(j)
   if( index.charAt(j)==' '||index.charAt(j)=='='){
    index.charAt(j)=='='&&(count=1);
   
    continue;
   }
  
 
  if(count==0){
    
    key+=index.charAt(j);
    
  }else{
    v+=index.charAt(j);
  }

  
 
  }
// console.log(v)
  obj[key]=v; 
}


return obj.jwt;

}






module.exports = (config, { strapi }) => {
  
  return async (ctx, next) => {

  try{
  
   const token=ctx.request.headers.cookie?cookieParser(ctx.request.headers.cookie):ctx.request.headers.authorization;
  
   const decoded=jwt.verify(token,process.env.CLIENT_SECRET_JWT);
   const {userId,email,image}=decoded
   ctx.userId=userId;
   ctx.email=email;
   ctx.profile=image;
console.log(image)

  await next();
 }catch(e){
  // ctx.email='test@gmailcom';
  await next()
 
// ctx.status=401;
// ctx.body={
//   massage:'unauthorized'
// }


 }
    
   
  };
};
