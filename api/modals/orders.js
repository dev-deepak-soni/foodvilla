
var express = require('express');
var router = express.Router();
const Razorpay = require('razorpay');


router.post('/order', (req, res) => {
  var instance = new Razorpay({ key_id: process.env.key_id, key_secret: process.env.key_secret })

  var options = {
    amount: req.body.amount,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
  };

  instance.orders.create(options, function (err, order) {
    console.log(order);
    res.send(order);
  });
})

router.post("/verify",(req,res)=>{
  let body=req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;
 
   var crypto = require("crypto");
   var expectedSignature = crypto.createHmac('sha256', 'J0qC6zxHJpGc3uLI1nijwNld')
                                   .update(body.toString())
                                   .digest('hex');
                                   console.log("sig received " ,req.body.razorpay_signature);
                                   console.log("sig generated " ,expectedSignature);
   var response = {"signatureIsValid":"false"}
   if(expectedSignature === req.body.razorpay_signature)
    response={"signatureIsValid":"true"}
       res.send(response);
       console.log('response',response);
   });

module.exports = router;
