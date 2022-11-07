const mongoose=require("mongoose");
const schema=new mongoose.Schema({
    customer_id:{
        type:String,
    },
    customer_name:String,
    email:String,
    Balance:Number
});
const model=new mongoose.model("customers",schema);

module.exports=model;