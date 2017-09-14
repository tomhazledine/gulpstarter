// Include gulp
var gulp         = require( 'gulp' );

// Include Our Plugins
var autoprefixer = require( 'gulp-autoprefixer' );
var babel        = require( 'gulp-babel');
var cache        = require( 'gulp-cache' );
var concat       = require( 'gulp-concat' );
var imagemin     = require( 'gulp-imagemin' );
var jshint       = require( 'gulp-jshint' );
var livereload   = require( 'gulp-livereload' );
var cleancss     = require( 'gulp-clean-css' );
var plumber      = require( 'gulp-plumber' );
var rename       = require( 'gulp-rename' );
var sass         = require( 'gulp-sass' );
var scsslint     = require( 'gulp-scss-lint' );
var size         = require( 'gulp-size' );
var svgSprite    = require( 'gulp-svg-sprite' );
var uglify       = require( 'gulp-uglify' );
var gutil        = require( 'gulp-util' );
var lr           = require( 'tiny-lr' );
var server       = lr();

var svgConfig = {};
var svgOutput = '';

// This will handle our errors
var onError = function errors( err ) {
    gutil.log( gutil.colors.red( err ) );
};

/**
 * ----------
 * CORE TASKS
 *
 * sass
 * scripts
 * ----------
 */

// Compile Our Sass
gulp.task( 'sass', function() {
    return gulp.src( 'uncompressed/scss/*.scss' )
    .pipe( sass().on( 'error', sass.logError ) )
    .pipe( autoprefixer( 'last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4' ) )
    .pipe( size({ title: 'css' }) )
    .pipe( gulp.dest( 'assets/css' ) )
    .pipe( rename({ suffix: '.min' }) )
    .pipe( cleancss() )
    .pipe( size({ title: 'css.min' }) )
    .pipe( gulp.dest( 'assets/css' ) );
});

// Concatenate & Minify JS
gulp.task( 'js', function() {
    return gulp.src(['uncompressed/js/vendor/*.js', 'uncompressed/js/custom/*.js'])
    .pipe(babel({ presets: ['env'] }))
    .pipe( plumber({ errorHandler: onError }) )
    .pipe( concat( 'app.js' ) )
    .pipe( size({ title: 'js' }) )
    .pipe( gulp.dest( 'assets/js' ) )
    .pipe( rename( 'app.min.js' ) )
    .pipe( uglify() )
    .pipe( size({ title: 'js.min' }) )
    .pipe( gulp.dest( 'assets/js' ) );
});

/**
 * ------------
 * OCCASSIONALS
 *
 * static js
 * image minification
 * svg sprites
 * ------------
 */

// Minify and transfer static JS files
gulp.task( 'js-static', function() {
    return gulp.src(['uncompressed/js/static/*.js', 'uncompressed/js/jquery/jquery.js'])
    .pipe( plumber({
        errorHandler: onError
    }) )
    .pipe( uglify() )
    .pipe( gulp.dest( 'assets/js/static' ) );
});

// Set up image minification
gulp.task( 'images', function() {
    return gulp.src( 'uncompressed/images/**' )
    .pipe( cache( imagemin({ optimizationLevel: 9, progressive: true, interlaced: true }) ) )
    .pipe( gulp.dest( 'assets/images' ) );
});

// SVG Sprite
svgConfig = {
    shape: {
        dest: 'intermediate'
    },
    mode: {
        symbol: true
    },
    svg: {
        xmlDeclaration: false,
        doctypeDeclaration: false,
        namespaceIDs: false,
        namespaceClassnames: false
    }
};
gulp.task( 'svg_build', function() {
    return gulp.src( 'uncompressed/icons/**/*.svg' )
    .pipe( svgSprite( svgConfig ) )
    .pipe( gulp.dest( 'assets/icons' ) );
});
svgOutput = 'html';
gulp.task( 'svg_rename', function() {
    return gulp.src( 'assets/icons/symbol/svg/*.svg' )
    .pipe( rename( 'iconsprite.svg.' + svgOutput ) )
    .pipe( gulp.dest( 'assets/icons' ) );
});
gulp.task('svg',
    gulp.series(
        'svg_build',
        'svg_rename'
    )
);

/**
 * -------------
 * LINTERS, ETC.
 *
 * scss
 * js
 * -------------
 */

// Lets lint our CSS
gulp.task( 'sass-lint', function() {
    return gulp.src( 'uncompressed/scss/*.scss' )
    .pipe( scsslint({ 'config': 'defaultLint.yml' }) );
});

// Lets lint our JS
gulp.task( 'js-lint', function() {
    return gulp.src( 'uncompressed/js/custom/*.js' )
    .pipe( jshint() )
    .pipe( jshint.reporter( 'default' ) );
});

/**
 * -----------
 * UTILITIES
 *
 * project setup
 * live-reload
 * watch
 * default
 * -----------
 */

// Project Setup
// Catch-all task for getting up-and-running in a new location
gulp.task( 'setup', 
    gulp.series(
        'sass',
        'js',
        'js-static',
        'images',
        'svg'
    )
);

// Livereload
gulp.task( 'listen', function( next ) {
    server.listen( 35728, function( err ) {
        if ( err ) {
            return console.log;
        }
        next();
    });
});

// Watch Files For Changes
gulp.task('watch', gulp.parallel(
    function  watchMessage() {
        return gutil.log( 'Watching source files for changes... Press ' + gutil.colors.cyan( 'CTRL + C' ) + ' to stop.' );
    },
    function     sassWatch() { gulp.watch('uncompressed/scss/*.scss',    gulp.parallel('sass')      );},
    function       jsWatch() { gulp.watch('uncompressed/js/custom/*.js', gulp.parallel('js')        );},
    function staticJsWatch() { gulp.watch('uncompressed/js/static/*.js', gulp.parallel('js-static') );},
    function      svgWatch() { gulp.watch('uncompressed/icons/**/*.svg', gulp.parallel('svg')       );},
    function   imagesWatch() { gulp.watch('uncompressed/images/**',      gulp.parallel('images')    );},
    function triggerReload() {
        gulp.watch( [
            '*.html',
            'assets/css/*.css',
            'assets/js/',
            'assets/icons/iconsprite.svg.' + svgOutput
        ] ).on( 'change', function( file ) {
            livereload( server ).changed( file.path );
        });
    }
));

// Default Task
gulp.task( 'default', gulp.series('watch') );
