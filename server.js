const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const nocache = require("nocache");
const app = express();
const userRoute = require('./route');

app.use(nocache())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
    secret: "qwe",
    resave: false,
    saveUninitialized: true
}))


app.use('/static', express.static(path.join(__dirname, "public")));

app.use("/", userRoute);



// setting the ejs engine
app.set("view engine", "ejs");


app.get('/', (req, res) => {
    if (req.session.error) {
        req.session.error = null;
        res.render('base', {error : "Invalid Email/Password"});
    } else if (req.session.user) {
        res.redirect('/dashboard')
    } else {
        res.render('base')
    }
})

app.get('/another',(req,res) => {
    res.sendFile(path.join(__dirname, "newfile.html") , (err,data) => {
        if(err) throw err
        console.log("successfull");
    })
})

app.get('/logsout',(req,res) => {
    res.redirect('/');
})


const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
    console.log("server is started");
})
