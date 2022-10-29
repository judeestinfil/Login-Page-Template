var express = require("express");
var router = express.Router();


const credential = {

    email:"admin@gmail.com",
    password: "admin123"
}

//login user
router.post('/login',(req,res)=>{
    if(req.body.email == credential.email &&req.body.password == credential.password){
        req.session.user = req.body.email;
        res.redirect('/route/gallery');
        // res.end('Login Successful..!')
    }else{
        res.end("invalid username")
    }
});

//route for dashboard
router.get('/gallery',(req,res)=>{
    if(req.session.user){
        res.render('gallery',{user:req.session.user})
    }else{
        res.send("Unauthorized user")
    }
});

//route for logout
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err)
            res.send("Error")
        }else{
            res.render('base',{title:"Express",logout:"logout Successfully..!"})
        }
    })
});

module.exports=router;