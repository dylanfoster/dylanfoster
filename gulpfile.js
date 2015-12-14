"use strict";

const gulp = require("gulp");

const FONTS = "bower_components/iris/fonts";
const IMAGES = "images/**/*";
const JAVASCRIPTS = "javascripts/**/*.js";
const SASS_SRC = "stylesheets/**/*.scss";
const tasks = require("./tasks");

gulp.task("build", ["fonts", "images", "sass", "vendor:css", "vendor:js", "javascripts", "metalsmith"]);
gulp.task("clean", tasks.clean);
gulp.task("fonts", ["clean"], tasks.fonts);
gulp.task("images", ["clean"], tasks.images);
gulp.task("javascripts", ["clean"], tasks.javascripts);
gulp.task("lint", tasks.lint);
gulp.task("metalsmith", ["clean"], tasks.metalsmith);
gulp.task("sass", ["clean"], tasks.sass);
gulp.task("server", tasks.server);
gulp.task("src", tasks.src);
gulp.task("templates", tasks.templates);
gulp.task("vendor:css", tasks.vendorCss);
gulp.task("vendor:js", tasks.vendorJavascript);

gulp.task("watch", function () {
  gulp.watch([FONTS], ["watch:fonts"]);
  gulp.watch([IMAGES], ["watch:images"]);
  gulp.watch([JAVASCRIPTS], ["watch:javascripts"]);
  gulp.watch([SASS_SRC], ["watch:sass"]);
  gulp.watch(["./templates/**/*", "src/**/*"], ["watch:metalsmith", "templates"]);
  gulp.watch(["vendor/**/*"], ["vendor:css", "vendor:js"]);
});

gulp.task("watch:fonts", tasks.fonts);
gulp.task("watch:images", tasks.images);
gulp.task("watch:javascripts", tasks.javascripts);
gulp.task("watch:metalsmith", tasks.metalsmith);
gulp.task("watch:sass", tasks.sass);

gulp.task("default", ["watch", "build", "server"]);
