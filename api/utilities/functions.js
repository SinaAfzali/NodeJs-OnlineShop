const {myDate} = require('../utilities/classes');


const newest_products = (products)=>{
    for(let i=0;i<products.length;i++){
        for(let j=i+1;j<products.length;j++){
          if((new myDate(products[i].date_add).compareTo(products[j].date_add)) === -1){
            let temp = products[i];
            products[i] = products[j];
            products[j] = temp;
          }
        }
      }
      return products;
}

const newest_comments = (comments)=>{
  for(let i=0;i<comments.length;i++){
      for(let j=i+1;j<comments.length;j++){
        if((new myDate(comments[i].date_add).compareTo(comments[j].date_add)) === -1){
          let temp = comments[i];
          comments[i] = comments[j];
          comments[j] = temp;
        }
      }
    }
    return comments;
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

const moreExpensive_products = (products)=>{
  for(let i=0;i<products.length;i++){
    for(let j=i+1;j<products.length;j++){
        if(Number(products[i].price) < Number(products[j].price)){
            let temp = products[i];
            products[i] = products[j];
            products[j] = temp;
        }
    }
}
return products;
}

const filterByCategory_products = (products, category)=>{
  list_products = [];
  let number = 0;
  for(let i=0;i<products.length;i++){
    if(products[i].filter === category){
      list_products[number] = products[i];
      number++;
    }
  }
  return list_products;
}



module.exports = {
  newest_products,
  cheapest_products,
  moreExpensive_products,
  filterByCategory_products,
  newest_comments,
}