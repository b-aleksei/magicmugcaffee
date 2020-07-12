'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const htmlmin = require('gulp-htmlmin');
const sourcemap = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const svgstore = require('gulp-svgstore');
const posthtml = require('gulp-posthtml');
const del = require('del');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const pngquant = require('imagemin-pngquant');
const terser = require('gulp-terser');
const rsync = require('gulp-rsync');

gulp.task('deploy', function() {
	return gulp.src('build/index.html')
		.pipe(rsync({
			root: 'build/',
			hostname: 'magicmug@magicmugcafe.com',
			destination: 'public_html/',
			// include: ['*.htaccess'], // Includes files to deploy
			exclude: ['**/Thumbs.db', '**/*.DS_Store'], // Excludes files from deploy
			recursive: true,
			archive: true,
			silent: false,
			compress: true,
		}));
});

gulp.task('css', function() {
	return gulp.src('source/sass/*.scss')
		.pipe(plumber())
		.pipe(sourcemap.init())
		.pipe(sass())
		.pipe(postcss([
			autoprefixer(),
		]))
		.pipe(csso())
		.pipe(rename({suffix: '.min'}))
		.pipe(sourcemap.write('.'))
		.pipe(gulp.dest('build/css'))
		.pipe(server.stream());
});

gulp.task('minhtml', () => {
	return gulp.src('source/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('build'));
});

// gulp.src('source/js/*.js', { dot: true, ignore: 'source/js/*.min.js' })
gulp.task('js', function() {
	return gulp.src(['source/js/*.js', '!source/js/*.min.js'])
		.pipe(terser({
			keep_fnames: true,
			mangle: false,
		}))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./build/js'));
}
);

gulp.task('server', function() {
	server.init({
		server: 'build/',
		notify: false,
		open: true,
		cors: true,
		ui: false,
	});
});

gulp.task('images', function() {
	return gulp.src('source/img/111/*.{png,jpg,svg}')
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			imagemin.jpegtran({progressive: true}),
			imageminJpegRecompress(),
			imagemin.svgo(),
			imagemin.optipng({optimizationLevel: 3}),
			pngquant({quality: '65-70', speed: 5}),
		], {
			verbose: true,
		}))
		.pipe(gulp.dest('source/img/222'));
});

gulp.task('webp', function() {
	return gulp.src('source/img/**/*.{png,jpg}')
		.pipe(webp({quality: 90}))
		.pipe(gulp.dest('source/img/webp'));
});

gulp.task('sprite', function() {
	return gulp.src('source/img/svg/*.svg')
		.pipe(svgstore({
			inlineSvg: true,
		}))
		.pipe(rename('sprite.svg'))
		.pipe(gulp.dest('source/img/svg'));
});

gulp.task('posthtml', function() {
	return gulp.src('source/*.html')
		.pipe(posthtml([
			include(),
		]))
		.pipe(gulp.dest('build'));
});

gulp.task('copy', function() {
	return gulp.src([
		'source/fonts/**/*.{woff,woff2}',
		'source/img/**',
		'source/js/*.min.js',
	], {
		base: 'source',
	})
		.pipe(gulp.dest('build'));
});

gulp.task('favicon', function() {
	return gulp.src('source/favicon/**')
		.pipe(gulp.dest('build'));
});

gulp.task('copySprite', function() {
	return gulp.src('source/img/sprite.svg')
		.pipe(gulp.dest('build/img'));
});

gulp.task('clean', function() {
	return del('build');
});

gulp.task('refresh', function(done) {
	server.reload();
	done();
});

gulp.task('watch', function() {
	gulp.watch('source/sass/**/*.{scss,sass}', {usePolling: true}, gulp.series('css'));
	gulp.watch('source/*.html', gulp.series('minhtml', 'refresh'));
	gulp.watch('source/js/*.js', gulp.series('js')).on('change', server.reload);
});

gulp.task('build', gulp.series('clean', 'copy', 'favicon', 'minhtml', 'css', 'js'));
gulp.task('updater', gulp.parallel('watch', 'server'));
// gulp.task("start", gulp.parallel("server", "watch"));
gulp.task('start', gulp.series('build', 'updater'));
