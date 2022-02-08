'use strict';
const express = require('express');
const axios = require("axios");
const { get } = require('http');


const app = express();
app.use(express.json());
require('dotenv').config()
const PORT = process.env.PORT || 3001;


// routes
app.get('/', handleHome);
app.get('/users', handleQuery);
app.get("/user/:id", handleParams);
app.post("/userInfo", handleBody);
app.get("/anime", handleAnime); // using .then().catch()
app.get("/anime/v2", handleAnimeV2) // using async - await


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
function handleParams(req, res) {
    console.log(req.params)
    res.send("I am working");
}
//http://localhost:3000/userInfo
// req.body : body is part of the req, it is a keyword
function handleBody(req, res) {
    console.log(req.body);
    res.json(req.body);
}
//3rd API: https://api.jikan.moe/v4/anime/1
// http://localhost:3000/anime
// axios.get().then().catch();
function handleAnime(req, res) {
    console.log(1, "before then");
    axios.get("https://api.jikan.moe/v4/anime/1").then(result => {
        // console.log(result.data.data);
        console.log(2, "Inside then");
        let animeObject = result.data.data;
        let anime = new Anime(animeObject)
        // res.send("Working");
        res.json(anime);
    }).catch(error => {
        console.log(error);
    })
    console.log(3, "after then");
}
// Async - await
// http://localhost:3000/anime/v2
// try {} catch (error){}
async function handleAnimeV2(req, res) {
    try {
        console.log(1, "before await");
        let result = await axios.get("https://api.jikan.moe/v4/anime/1");
        console.log(2, "after await");
        // console.log(result.data.data);
        let animeObject = result.data.data;
        let anime = new Anime(animeObject)
        res.json(anime)
    }
    catch (error) {
        console.log(error);
    }
}


// constructor
function Anime(animeInfo) {
    this.title = animeInfo.title;
    this.episodes = animeInfo.episodes;
}

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
