"use strict";

const http = require("http");
const path = require("path");

const Handlebars = require("handlebars");
const HandlebarsLayouts = require("handlebars-layouts");
const highlight = require("metalsmith-code-highlight");
const markdown = require("metalsmith-markdown");
const metallic = require("metalsmith-metallic");
const Metalsmith = require("metalsmith");
const metadata = require("metalsmith-metadata");
const layouts = require("metalsmith-layouts");
const inline = require("metalsmith-in-place");

const config = require("./config");

HandlebarsLayouts.register(Handlebars);

module.exports = function () {
  return Metalsmith(__dirname)
    .clean(false)
    .metadata(require("./config").meta)
    .use(metallic())
    .use(highlight())
    .use(markdown({
      smartyPants: true,
      gfm: true
    }))
    .use(layouts({
      engine: "handlebars",
      directory: "templates",
      partials: "templates/partials"
    }))
    .use(inline({
      engine: "handlebars",
      partials: "templates/partials"
    }))
    .destination(config.buildDir)
    .build(function (err) {
      if (err) { throw err; return; }
      console.log(`App succsesfully built to ${config.buildDir}`);
    });
};
