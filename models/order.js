const mongoose=require("mongoose");
const schema=new mongoose.Schema({
    customer_id:String,
    product_id:String,
    product_name:String,
    quantity:Number
});
const model=new mongoose.model("orders",schema);

module.exports=model;