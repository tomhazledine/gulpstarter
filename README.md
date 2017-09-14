# Gulp Starter

## Overview

This is a standard Gulp package to drop into any generic web project. Gulp is a command-line task runner. We can use it to run repetitive development tasks, saving ourselves time and allowing us to focus on actual *work* rather than tooling. For instance, writing SASS is a much nicer experience than writing vanilla CSS, but our `.scss` files need to be compiled into regular `.css` every time we make a change. We can let Gulp do this for us by running `gulp sass` in the command line. In addition, Gulp will also run our Sass through other tools for us.

Another benefit of Gulp is that it can "watch" our files. When Gulp is running the watch task (by running `gulp watch` or the default `gulp` command) it will automatically trigger the relevant tasks when our files are saved/changed.

## Installation

Run `npm install` to set-up the Gulp environment. You'll need to have [Node](https://nodejs.org/en/) already installed. The most recent stable version should be fine (at time of writing `v6.11.3`), but any version >=7 will break this particular setup.

---

## Core Tasks

### SASS

Takes `.scss` files from the source directory and outputs our compressed and pre-processed production files into the output directory.

* Usage: `gulp sass`
* source: `uncompressed/scss/*.scss`
* output: `assets/css` (Created two versions - `*.css` & `*.min.css`)
* tools:
    - standard SCSS
    - Autoprefixer: we don't need to write browser prefixes (eg `-webkit-` or `-moz-` etc.) manually anymore
    - size: reports the size of the final files
    - minify: removes whitespace and line-breaks and comments to make the final file smaller

### JavaScript
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
* Usage: `gulp js-static`
* source: `uncompressed/js/static/*.js`
* output: `assets/js/static` (`*.js`)
* tools:
    - uglify

### Images
* Usage: `gulp images`
* source: `uncompressed/images/**`
* output: `assets/images`
* tools:
    - imagemin

### SVG Sprites
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