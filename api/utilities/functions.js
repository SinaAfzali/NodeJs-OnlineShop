const newest_products = (products)=>{
    for(let i=0;i<products.length;i++){
        for(let j=i+1;j<products.length;j++){
          if((new Date(products[i].date_add).compareTo(products[j].date_add)) === 1){
            let temp = products[i];
            products[i] = products[j];
            products[j] = temp;
          }
        }
      }
      return products;
}

const cheapest_products = (products)=>{
    for(let i=0;i<products.length;i++){
        for(let j=i+1;j<products.length;j++){
            if(Number(products[i].price) > Number(products[j].price)){
                let temp = products[i];
                products[i] = products[j];
                products[j] = temp;
            }
        }
    }
    return products;
}

