const express=require("express");
const router=express.Router();
const bodyparser=require("body-parser");
router.use(bodyparser());
const productModel=require("../models/product")

router.post("/product",async (req,res)=>{
    try{
       const data= await productModel.create({
        product_id:req.body.product_id,
        product_type:req.body.product_type,
        product_name:req.body.product_name,
        product_price:req.body.product_price,
        availableQuantity:req.body.availableQuantity
       });
       res.status(200).json({
          status:"Success",
          data:data
       })
    }
    catch(err){
        res.status(400).json({
          status:"failed",
          message:err.message
        })
    }
});
router.get("/getproducts",async(req,res)=>{
    try{
         const data=await productModel.find();
         res.status(200).json({
            status:"sucess",
            data:data
         })
    }
    catch(err){
        res.status(500).json({
            status:"failed",
            message:err.message
          })
    }
})


module.exports=router;



