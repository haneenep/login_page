const express = require('express');
const router = express.Router()

const credential = {
    email: "admin@gmail.com",
    password: "123"
}

// login user
router.post('/login', (req, res) => {
    console.log(req.body)
    if (req.body.email == credential.email && req.body.password == credential.password){
        req.session.user = req.body.email;
        res.redirect('/dashboard');
    }else{
        req.session.error = "Invalid Input";
        res.redirect('/');
    }
})


// route for dashboard
router.get('/dashboard',(req, res) => {
    if(req.session.user){
        res.render("dashboard",{user:req.session.user})
    }else{
        res.redirect('/')
    }
})


// route for logout
router.post("/logout",loginRequire,(req,res) => {
    req.session.destroy((err) => {
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('base',{logout : "logout successfully"})
        }
    })
})



function loginRequire (req,res,next){
    if(!req.session.user){
        res.redirect('/');
    }else{
        next();
    }
}

module.exports = router;



