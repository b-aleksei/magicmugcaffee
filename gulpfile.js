"use strict";

const gulp = require("gulp"),
  plumber = require("gulp-plumber"),
  htmlmin = require("gulp-htmlmin"),
  sourcemap = require("gulp-sourcemaps"),
  sass = require("gulp-sass"),
  postcss = require("gulp-postcss"),
  csso = require("gulp-csso"),
  rename = require("gulp-rename"),
  svgstore = require("gulp-svgstore"),
  posthtml = require("gulp-posthtml"),
  include = require("posthtml-include"),
  del = require("del"),
  autoprefixer = require("autoprefixer"),
  server = require("browser-sync").create(),
  webp = require("gulp-webp"),
  imagemin = require("gulp-imagemin"),
  imageminJpegRecompress = require("imagemin-jpeg-recompress"),
  pngquant = require("imagemin-pngquant"),
  cache = require("gulp-cache"),
  terser = require('gulp-terser');

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename({suffix: ".min"}))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("minhtml", () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"));
});

// gulp.src('source/js/*.js', { dot: true, ignore: 'source/js/*.min.js' })
gulp.task('js', function () {
    return gulp.src(["source/js/*.js", "!source/js/*.min.js"])
      .pipe(terser({
        keep_fnames: true,
        mangle: false
      }))
      .pipe(rename({suffix: ".min"}))
      .pipe(gulp.dest('./build/js'))
  }
);

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });
});

gulp.task("images", function () {
  return gulp.src("source/img/111/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imageminJpegRecompress(),
      imagemin.svgo(),
      imagemin.optipng({optimizationLevel: 3}),
      pngquant({quality: "65-70", speed: 5})
    ], {
      verbose: true
    }))
    .pipe(gulp.dest("source/img/222"))
});

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img/webp"))
});

gulp.task("sprite", function () {
  return gulp.src("source/img/svg/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("source/img/svg"))
});

gulp.task("posthtml", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"))
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/*.min.js"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
});

gulp.task("favicon", function () {
  return gulp.src("source/favicon/**")
    .pipe(gulp.dest("build"))
});

gulp.task("copySprite", function () {
  return gulp.src("source/img/sprite.svg")
    .pipe(gulp.dest("build/img"))
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("watch", function () {
  gulp.watch("source/sass/**/*.{scss,sass}", {usePolling: true}, gulp.series("css"));
  gulp.watch("source/*.html", gulp.series("minhtml", "refresh"));
  gulp.watch("source/js/*.js", gulp.series("js")).on("change", server.reload);
});

gulp.task("build", gulp.series("clean", "copy", "favicon", "css", "minhtml"));
gulp.task("updater", gulp.parallel("watch", "server"));
// gulp.task("start", gulp.parallel("server", "watch"));
gulp.task("start", gulp.series("build", "updater"));
