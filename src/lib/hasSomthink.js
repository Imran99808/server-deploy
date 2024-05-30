function has(data,userEmail){
    // const has=false;
    const innerData=data
    
    

     for(let i=0;i<innerData.length;i++){
     
        const singleData=innerData[i];
        singleData.hasWishlist=false;
         

        
         for(let j=0;j<singleData.wish_lists.length;j++){
      
              const  relationData=singleData.wish_lists[j];
            
            if(relationData.email===userEmail){
               
                 singleData.hasWishlist=true;
                break;
                 
            }
          }

      
     }

   return innerData;
}


module.exports=has;