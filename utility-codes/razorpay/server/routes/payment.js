const router = require("express").Router();
const Razorpay = require("razorpay");
const crypto = require("crypto");

router.post("/orders", async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: process.env.KEY_ID,
      key_secret: process.env.KEY_SECRET,
      image: "https://i.imgur.com/n5tjHFD.png",
    });
    

    const options = {
      amount: req.body.amount * 100, // amount in smallest currency unit
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };

    const order = await instance.orders.create(options);

    // console.log(order)

    if (!order) return res.status(500).send("Some error occured");

    res.status(200).json({data:order});
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/verify", async (req, res) => {
    try{

        const {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature ,
        } = req.body;

        const sign = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSign = crypto
            .createHmac("sha256", process.env.KEY_SECRET)
            .update(sign.toString())
            .digest("hex");
        
        if(expectedSign !== razorpay_signature )
            return res.status(400).json({msg:"Transaction not legit!"});

        res.status(200).json({msg:"Transaction verified successfully!"});
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
