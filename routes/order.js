const express=require("express");
const router=express.Router();
const bodyparser=require("body-parser");
router.use(bodyparser());
const orderModel=require("../models/order");
const productModel=require("../models/product");
const customerModel=require("../models/customer")

router.post("/order",async (req,res)=>{
    try{
    let [product]=await productModel.find({product_id:req.body.product_id});
    // console.log(product.product_price);
    // console.log(product.availableQuantity);
    let [customer]=await customerModel.find({customer_id:req.body.customer_id});
    // console.log(typeof customer);
    if(customer==undefined){
        return  res.status(500).json({
             status:"failed",
             message:"customer is not registered"
         })
     }
     if(product==undefined){
         return  res.status(500).json({
              status:"failed",
              message:"product is not available"
          })
      }
     
    // console.log(customer.Balance);
    let amount=req.body.quantity*product.product_price;
    // console.log(amount);
    let remainingAmount=customer.Balance-amount;
    let remainingQuantity=product.availableQuantity-req.body.quantity;
    if(remainingQuantity<=0){
        return res.status(500).json({
           message:"OUT OF STACK"
        })
     }
    if(remainingAmount<0){
        return res.status(500).json({
            status:"order cannot be placed beccause of low balance "
        })
     }
    await customerModel.updateOne({customer_id:req.body.customer_id},{$set:{
        Balance:remainingAmount
    }})
    await productModel.updateOne({product_id:req.body.product_id},{
        $set:{
            quantity:remainingQuantity
        }
    });
   
    
// res.send("hello"); 
    const data= await orderModel.create({
    customer_id:req.body.customer_id,
    product_id:req.body.product_id,
    product_name:req.body.product_name,
    quantity:req.body.quantity
       });
       res.status(200).json({
          status:"order placed succesfully",
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
router.get("/getorders",async(req,res)=>{
    try{
         const data=await orderModel.find();
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



