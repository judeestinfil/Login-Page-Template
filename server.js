const express = require('express');
const path = require('path');
const bodyparser = require("body-parser");
const session = require('express-session');
const { v4:uuidv4}=require("uuid")

const router = require('./router');

const app = express();

const port = process.env.PORT||3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.set('view engine', 'ejs');

//load static assets
app.use(express.static( 'public'))


app.use(session({
    secret:uuidv4(),// '1b9d6bcd-bbfd-4b2d-9b5d-ab985904nlkv'
    resave:false,
    saveUninitialized:true
}));

app.use('/route',router)

//home route
app.get('/',(req,res)=>{
    res.render('base', {title:"Login System"});
})

app.listen(port, ()=>{console.log("Listening to the server on http:/localhost:3000")})