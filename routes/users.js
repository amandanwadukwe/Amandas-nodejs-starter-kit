const express = require("express");

//Import middlewares
const {auth} = require("../middleware/auth");
const {admin, editor, viewer} = require("../middleware/roles");


let users=[{id:1, username:"amandanwadukwe",email:"amandanwadukwe@gmail.com", password:"123$2b$15$uPvyd5wmCJj/bUKx9jxwTehzz1g/4pvex1AoRFakQZZ/ZxcbrQqzG4"}];


const router = express.Router();


router.get("/:user", [auth,viewer], (req,res) => {
    console.log(req.params.user);
    res.send({
        ok:true,
        result: users.filter(user => user.username === req.params.user)
    });
});

router.post("/:user", [auth, editor], async (req,res) => {
    users.filter(user => user.email === req.params.email)
    //write code to add something to the user object
    res.status(200).send({
        ok:true,
        result:"something should be added to user"
    });
});

router.put("/:user", [auth,editor], async(req,res) => {
    //update the user
    res.status(200).send({
        ok:true,
        result:"you are about to make an update"
    });
});

router.delete("/:user", [auth,admin], async(req,res) => {
    //Delete the user
    res.status(200).send({
        ok:true,
        result:"you are about to delete the user"
    })
})
module.exports = router;