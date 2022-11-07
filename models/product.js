const mongoose=require("mongoose");
const schema=new mongoose.Schema({
    product_id:{
        type:String,
        
    },
    product_type:{
        type:String,    
    },
    product_name:{
        type:String,
    },
    product_price:Number,
    availableQuantity:Number
});
const model=new mongoose.model("products",schema);

module.exports=model;