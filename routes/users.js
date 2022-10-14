const express = require("express");

//Import middlewares
const {auth} = require("../middleware/auth");
const {admin, editor, viewer} = require("../middleware/roles");


let users=[{id:1, username:"amandanwadukwe",email:"amandanwadukwe@gmail.com", password:"123$2b$15$uPvyd5wmCJj/bUKx9jxwTehzz1g/4pvex1AoRFakQZZ/ZxcbrQqzG4", role:"admin"}];


const router = express.Router();


router.get("/", [auth,viewer], (req,res) => {
    if(users.filter(user => user.email === req.body.email).length === 0) return res.status(409).send({ok:false, result:"User does not exist"});
    res.send({
        ok:true,
        result: users.filter(user => user.email === req.body.email)
    });
});

router.post("/", [auth, editor], async (req,res) => {    
    if (users.filter(user => user.username === req.body.newUser.username).length > 0)  return res.status(409).send({ok:false, result:"username unavailable"});
    if (users.filter(user => user.email === req.body.newUser.email).length > 0) return res.status(409).send({ok:false, result:"email unavailable"});

    //update the data
    users.push(req.body.newUser);
    
    res.status(200).send({
        ok:true,
        result:"user added"
    });
});

router.put("/", [auth,editor], async(req,res) => {
    //update the user

    res.status(200).send({
        ok:true,
        result:"you are about to make an update"
    });
});

router.delete("/", [auth,admin], async(req,res) => {
    //Delete the user
    users.map(user => {
        if(user.username !== req.body.user || user.email !== req.body.user){
            return user
    }})

    res.status(200).send({
        ok:true,
        result:"you are about to delete the user"
    })
})
module.exports = router;