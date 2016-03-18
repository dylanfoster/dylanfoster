"use strict";

const path = require("path");

module.exports = {
  buildDir: path.join(__dirname, "_site"),
  meta: {
    title: "Dylan Foster | Professional and freelance developer",
    projects: [{
      name: "AniFit",
      image: "/assets/images/anifit.png",
      description: "AniFit is a canine fitness monitor and they were looking for a great way to showcase their product",
      tags: ["JavaScript", "SASS", "Wordpress"],
      site: "http://anifit.co"
    }, {
      name: "Bonfire",
      image: "/assets/images/bonfire.png",
      description: "Bonfire is a personal passion of mine. Borrowing from Wordpress and Ghost, it should help bring a little joy to content management",
      tags: ["Ember.js", "Node.js", "PostgreSQL"],
      site: "https://github.com/BonfireCMS/bonfire"
    }, {
      name: "TopSecret",
      image: "/assets/images/ban.png",
      description: "This top secret project is going to be huge! Of course, I can't talk about it so you'll just have to wait",
      tags: ["Node.js", "RESTful", "PostgreSQL"],
      site: "/ahahah"
    }, {
      name: "Apple",
      image: "/assets/images/apple.png",
      description: "As an interactive developer at Apple, ....",
      tags: ["Node.js", "Ember.js", "PostgreSQL", "Docker"],
      site: "http://apple.com"
    }, {
      name: "Google",
      image: "/assets/images/google.png",
      description: "As an QA Lead at Google, ....",
      tags: ["JavaScript", "PHP", "Management", "Customer relations"],
      site: "http://utest.com"
    }, {
      name: "Twitter",
      image: "/assets/images/twitter.png",
      description: "As an QA Lead at Twitter, ....",
      tags: ["JavaScript", "PHP", "Management", "Customer relations"],
      site: "http://utest.com"
    }]
  }
};
