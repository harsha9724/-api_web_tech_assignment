const express=require("express");
const app=express();
const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://Harsha:harsha%401234@cluster0.ohltzw6.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser: true},()=>{
    console.log("connected to db");
})
const productRouter=require("./routes/product");
const customerRouter=require("./routes/customer");
const orderRouter=require("./routes/order")
app.use("/",productRouter);
app.use("/",customerRouter);
app.use("/",orderRouter);



app.listen(3000,()=>{
    console.log("server is up at port 3000");
})