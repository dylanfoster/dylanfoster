"use strict";

const fs = require("fs");
const path = require("path");

const autoprefixer = require("gulp-autoprefixer");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const connect = require("gulp-connect");
const del = require("del");
const eslint = require("gulp-eslint");
const gulpHeader = require("gulp-headerfooter");
const footer = gulpHeader.footer;
const gulp = require("gulp");
const header = gulpHeader.header;
const minify = require("gulp-minify");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");

const build = require("./build");
const BUILD_DIR = "_site";
const SASS_SRC = "stylesheets/**/*.scss";
const JAVASCRIPTS = "javascripts/**/*.js";
const IMAGES = "images/**/*";

let autoprefixerOptions = {
  browsers: ["> 1%", "last 2 versions", "safari 8"]
};

module.exports = {
  clean() {
    return del.sync([BUILD_DIR]);
  },

  fonts() {
    return gulp.src(["bower_components/font-awesome/fonts/**/*"])
      .pipe(gulp.dest(path.join(BUILD_DIR, "assets/fonts")));
  },

  images() {
    return gulp.src(["images/**/*"])
      .pipe(gulp.dest(path.join(BUILD_DIR, "assets/images")));
  },

  javascripts() {
    return gulp.src([JAVASCRIPTS])
      .pipe(sourcemaps.init())
      .pipe(babel({
        presets: ["es2015", "es2015-node4"]
      }))
      .pipe(concat("app.js"))
      .pipe(header("(function () {"))
      .pipe(footer("})();"))
      .pipe(minify())
      .pipe(sourcemaps.write("../maps"))
      .pipe(gulp.dest(path.join(BUILD_DIR, "assets/javascripts")))
      .pipe(connect.reload());
  },

  lint() {
    return gulp.src([JAVASCRIPTS])
      .pipe(eslint())
      .pipe(eslint.format());
  },

  metalsmith() {
    build();
  },

  sass() {
    return gulp.src([SASS_SRC])
      .pipe(sourcemaps.init())
      .pipe(sass({
        includePaths: ["bower_components/font-awesome/scss"]
      }).on("error", sass.logError))
      .pipe(autoprefixer(autoprefixerOptions))
      .pipe(concat("app.css"))
      .pipe(sourcemaps.write(path.join("../maps")))
      .pipe(gulp.dest(path.join(BUILD_DIR, "assets/stylesheets")))
      .pipe(connect.reload());
  },

  server() {
    connect.server({
      root: [BUILD_DIR],
      port: 3000,
      livereload: true,
      middleware(connect) {
        return [
          connect.static(BUILD_DIR),
          function (req, res, next) {
            let file = fs.readFileSync(path.join(BUILD_DIR, "404.html"));
            res.statusCode = 404;
            res.end(file);
          }
        ]
      }
    });
  },

  templates() {
    return gulp.src(["./templates/**/*", "src/**/*"])
      .pipe(connect.reload());
  },

  vendorCss() {
    return gulp.src(["vendor/highlight/styles/default.css"])
      .pipe(autoprefixer(autoprefixerOptions))
      .pipe(concat("vendor.css"))
      .pipe(gulp.dest(path.join(BUILD_DIR, "assets/stylesheets")))
      .pipe(connect.reload());
  },

  vendorJavascript() {
    return gulp.src(["vendor/**/*.js"])
      .pipe(concat("vendor.js"))
      .pipe(minify())
      .pipe(gulp.dest(path.join(BUILD_DIR, "assets/javascripts")))
      .pipe(connect.reload());
  }
};
