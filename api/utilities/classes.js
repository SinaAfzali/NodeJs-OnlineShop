const moment = require('moment-jalaali');


class Date{
    constructor(date){
        this.date = date;
        let list_date = Date.date_splite(date);
        this.year = list_date[0];
        this.month = list_date[1];
        this.day = list_date[2];
        this.hour = list_date[3];
        this.minute = list_date[4];
        this.second = list_date[5];
    }

    static date_splite(date_s){
        let arr = date_s.split(" "); 
        let [year, month, day] = arr[0].split("/"); 
        let [hour, minute, second] = arr[1].split(":");
        year = Number(year);
        month = Number(month);
        day = Number(day);
        hour = Number(hour);
        minute = Number(minute);
        second = Number(second);
        return [year, month, day, hour, minute, second];
    }

    compareTo(date2){
        let list_date = Date.date_splite(date2);
        if(this.year > list_date[0])return 1;
        else if(list_date[0] > this.year) return -1;
        else{
            if(this.month > list_date[1])return 1;
            else if(list_date[1] > this.month)return -1;
            else{
                if(this.day > list_date[2])return 1;
                else if(list_date[2] > this.day)return -1;
                else{
                    if(this.hour > list_date[3])return 1;
                    else if(list_date[3] > this.hour)return -1;
                    else{
                        if(this.minute > list_date[4])return 1;
                        else if(list_date[4] > this.minute)return -1;
                        else{
                            if(this.second > list_date[5])return 1;
                            else if(list_date[5] > this.second)return -1;
                            else{
                                return 0;
                                }
                            }
        }
    }
}
}

}

    static now(){
        const jMoment = moment(); 
        const jalaliDate = jMoment.format('jYYYY/jMM/jDD HH:mm:ss');
        return jalaliDate;
    }


}







class Product {
    constructor(name, price, description, productNumber, image, filter, discount, features, status, seller_id, total_scores, number_scores) {
      this.name = name;
      this.price = price;
      this.description = description;
      this.productNumber = productNumber;
      this.image = image;
      this.filter = filter;
      this.features = features;
      this.status = status;
      this.seller_id = seller_id;
      this.total_scores = total_scores;
      this.number_scores = number_scores;
      if(discount)this.addDiscount(discount);
    }

    addDiscount(discount){
      this.discount = discount;
    }


    static status_available = "موجود";

    static status_unavailable = "ناموجود";

    static status_dontdisplay = "عدم نمایش";
  }


  
module.exports = {Date, Product};