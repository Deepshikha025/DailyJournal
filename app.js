//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _= require("lodash");

const homeStartingContent = "We welcome you to the Blog Spot and hope that you've an amazing time writing and expressing your thoughts.We look forward that you write about yourself and your thoughts to help and inspire others, who so ever comes across it. Have an amazing time ahead!! ";
const aboutContent = "We are a team of full of people who not only wants good for you but the best and we hope that we provide you an easy way to express your thoughts on this website. We have developed this website only 2 years back and starting from mere 35 people of team, we are now a family of five lakh people.";
const contactContent = "You are most welcome for your queries and can contact us at anytime. Solving your issues is our job and we look forward to a healthy relationship with you all. The contact numbers are: 9898989898, you can also mail your issues faced on the mail-id: blogspotxyz@gmail.com";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var posts = [];


app.get("/", function(req, res){
  res.render("home", {startingContent : homeStartingContent,
  posts: posts
  });
});
app.get("/about", function(req, res){
  res.render("about", {aboutusContent : aboutContent});
});
app.get("/contact", function(req, res){
  res.render("contact", {contactusContent : contactContent});
});
app.get("/compose", function(req, res){
  res.render("compose");
});


app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);

  res.redirect("/");
});






app.get("/posts/:postName", function(req, res){
  const requestedTitle= _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle =_.lowerCase(post.title);

    if(storedTitle=== requestedTitle){
      res.render("post",{
        title: post.title,
        content: post.content
      });
    }
    
  });

});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});

