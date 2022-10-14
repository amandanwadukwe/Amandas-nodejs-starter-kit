const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
var nodemailer = require('nodemailer');

//Setup the express server router
const router = express.Router();

require("dotenv").config();

router.post("/", async(req,res) => {
    //Dummy data
    const users = [{email:"amandanwadukwe@gmail.com", password:"$2b$15$uPvyd5wmCJj/bUKx9jxwTehzz1g/4pvex1AoRFakQZZ/ZxcbrQqzG", username:"amandanwadukwe", roles:["admin","editor","viewer"]}];

   
    //Get user from database, if the user is not there return a clear error
    let user = users.find(u => u.email === req.body.email);
    if (!user) throw new Error ("Invalid email or password");

    //Compare the password with the password in the database
    const valid = await bcrypt.compare(req.body.password, user.password)
    if (!valid) throw new Error("Invalid email or password");

    const token = jwt.sign({
        id:user._id,
        roles:user.roles,
    }, "jwtPrivateKey", {expiresIn: "15m"});

    //Email verification
    if(!req.body.isMember){
        var transporter = nodemailer.createTransport({
            service: 'yahoo',
            auth: {
            user: 'nwadukweamanda@yahoo.com',
            pass: process.env.NODEMAILER_PASSWORD
            }
        });
        
        var mailOptions = {
            from: 'nwadukweamanda@yahoo.com',
            to: req.body.email,
            subject: 'RAIS registration access token',
            text: `Thank you for making a registration request! \n\n Your access token is: \n\n${token}`
        };
        
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
            console.log(error);
            } else {
            console.log('Email token sent: ' + info.response);
            }
        });
        console.log("A token has been sent to your email, cheers!")
    }

    res.send({
        ok:true,
        token:token
    });
});

module.exports = router;