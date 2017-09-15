# Gulp Starter

## Overview

This is a standard Gulp package to drop into any generic web project. Gulp is a command-line task runner. We can use it to run repetitive development tasks, saving ourselves time and allowing us to focus on actual *work* rather than tooling. For instance, writing SASS is a much nicer experience than writing vanilla CSS, but our `.scss` files need to be compiled into regular `.css` every time we make a change. We can let Gulp do this for us by running `gulp sass` in the command line. In addition, Gulp will also run our Sass through other tools for us.

Another benefit of Gulp is that it can "watch" our files. When Gulp is running the watch task (by running `gulp watch` or the default `gulp` command) it will automatically trigger the relevant tasks when our files are saved/changed.

## Installation

Run `npm install` to set-up the Gulp environment. You'll need to have [Node](https://nodejs.org/en/) already installed. The most recent stable version should be fine (at time of writing `v6.11.3`), but any version >=7 will break this particular setup.

---

## Core Tasks

### SASS

* **Why do we want to do this?** Using Sass means that we can get more functionality from our CSS without adding any additional performance overhead. We can can break our css code into easier-to-understand partials and use variables and functions, but *still* only serve one static asset to the browser (pre-processing === compiling). We can also improve cross-browser support and further optimize our css with the use of extra automated tools (e.g. checking for errors before compilation, automatically applying vendor prefixes for newer features, minifying our output...).
* Usage: `gulp sass`
* source: `uncompressed/scss/*.scss`
* output: `assets/css` (Created two versions - `*.css` & `*.min.css`)
* tools:
    - standard SCSS
    - Autoprefixer: we don't need to write browser prefixes (eg `-webkit-` or `-moz-` etc.) manually anymore
    - size: reports the size of the final files
    - minify: removes whitespace and line-breaks and comments to make the final file smaller

### JavaScript

* **Why do we want to do this?** New language features (ES6, ES2017, ESNext, etc.) are available for most modern browsers, but we still need to transpile and polyfill for full cross-browser support. Much like with our CSS, we want to serve as few assets as possible - ideally just one. Using this Gulp task lets us write our code in neat partials and then concatenates them automatically. It also checks our code for syntax errors and minifies the final output.
* Usage: `gulp js`
* source: `uncompressed/js/jquery/jquery.js`, `uncompressed/js/vendor/*.js`, `uncompressed/js/custom/*.js`
* output: `assets/js` (`app.js`, `app.min.js`)
* tools:
    - babel: transpiles ES6 for older browsers
    - concat: smushes our files together into one single asset
    - size: reports the size of the final files
    - uglify: removes whitespace and line-breaks and comments to make the final file smaller

---

## Occasionals

### Static JS
* **Why do we want to do this?** Even though we only really want to serve one single JS file to the browser, we sometimes need to generate separate files. This can be useful for conditionally loaded scripts (e.g. <IE9 polyfills ) or library files that we think will benefit from browser caching.
* Usage: `gulp js-static`
* source: `uncompressed/js/static/*.js`
* output: `assets/js/static` (`*.js`)
* tools:
    - uglify

### Images
* **Why do we want to do this?** Images are big and slow. This is a simplistic attempt to optimize them. Needs more work and file support etc.
* Usage: `gulp images`
* source: `uncompressed/images/**`
* output: `assets/images`
* tools:
    - imagemin

### SVG Sprites
* **Why do we want to do this?** For a full explanation of SVG Sprites, read my post on [what they are, why we want them, and how to use them](https://tomhazledine.com/inline-svg-icon-sprites/).
* Usage: `gulp svg`
* source: `uncompressed/icons/**/*.svg`
* output: `assets/icons` (`*.js`)
* tools:
    - SVG sprite
    - clean intermediate files

---

## Linters, etc.

### CSS Lint
* Usage: `gulp sass-lint`
* source: `uncompressed/scss/*.scss`
* config.: `defaultLint.yml`

### JS Lint
* Usage: `gulp js-lint`
* source: `uncompressed/js/custom/*.js`

---

## Utilities


## Project Setup
Catch-all task for getting up-and-running in a new location.
* Usage: `gulp setup`
* tools:
    - `sass`
    - `js`
    - `js-static`
    - `images`
    - `svg`