'use strict';
const express = require('express');



const app = express();
app.use(express.json());
require('dotenv').config()
const PORT = process.env.PORT || 3001;


// routes
app.get('/', handleHome);
app.get('/users', handleQuery);
app.get("/user/:id", handleParams);
app.post("/userInfo", handleBody);


// functions
// http://localhost:3000/
function handleHome(req, res) {
    res.send("Hello World!");
    // res.status(200).json();
    // res.download();
}
// http://localhost:3000/users?username=Amer&age=27
// req.query : query is part of the req, it is a keyword
function handleQuery(req, res) {
    console.log(req.query);
    res.json(req.query);
}
// http://localhost:3000/user/1
// req.params : params is part of the req, it is a keyword
function handleParams(req,res){
    console.log(req.params)
    res.send("I am working");
}
//http://localhost:3000/userInfo
// req.body : body is part of the req, it is a keyword
function handleBody(req,res){
    console.log(req.body);
    res.json(req.body);
}


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
