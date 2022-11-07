const express=require("express");
const router=express.Router();
const bodyparser=require("body-parser");
router.use(bodyparser());
const customerModel=require("../models/customer")

router.post("/customer",async (req,res)=>{
    try{
       const email=await customerModel.find({email:req.body.email});
       const id=await customerModel.find({customer_id:req.body.customer_id});
    //    console.log(email,id)
       if(email.length>0){
         return   res.status(501).json({
                 message:"email is already registerd"
            })
       }
      else  if(id.length>0){
       return res.status(501).json({
            message:"id is already registerd"
       });
       }
       const data= await customerModel.create({
        customer_id:req.body.customer_id,
        customer_name:req.body.customer_name,
        email:req.body.email,
        Balance:req.body.Balance
       });
     return  res.status(200).json({
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
router.get("/getcustomer",async(req,res)=>{
    try{
         const data=await customerModel.find();
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



