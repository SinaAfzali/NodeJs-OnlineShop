const Database = require('../utilities/db_mongo');
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
        console.log(arr);
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

class ProductsModel{
    static getProducts(){
        
    }

    static getProduct(id){

    }

    static updateProduct(id, newProduct, set_or_unset){

    }

    static async insertProduct(product){
        let result = await Database.insertDocument("products", Object.assign({}, product, {date_add: Date.now()}));
        return result;
    }

    static deleteProduct(id){

    }
    
}


module.exports = {ProductsModel, Date};