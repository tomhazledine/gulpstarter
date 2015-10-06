# Gulp Starter

A standard Gulp package to drop into any generic web project.

## Installation

Run `npm install` to set-up the Gulp environment.

---

## Core Tasks

### SASS

* Usage: `gulp sass`
* source: `uncompressed/scss/*.scss`
* output: `assets/css` (`*.css`, `*.min.css`)
* tools:
    - standard SCSS
    - autoprefixer
    - size
    - minify

### Scripts
* Usage: `gulp scripts`
* source: `uncompressed/js/jquery/jquery.js`, `uncompressed/js/vendor/*.js`, `uncompressed/js/custom/*.js`
* output: `assets/js` (`app.js`, `app.min.js`)
* tools:
    - concat.
    - size
    - uglify

---

## Occasionals

### Static JS
* Usage: `gulp staticjs`
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

### Fonts
* Usage: `gulp fonts`
* source: `uncompressed/fonts/**`
* output: `assets/fonts`

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
* Usage: `gulp scss-lint`
* source: `uncompressed/scss/*.scss`
* config.: `defaultLint.yml`

### JS Lint
* Usage: `gulp jslint`
* source: `uncompressed/js/custom/*.js`

---

## Utilities

## Test
* Usage: `gulp test`

## Project Setup
Catch-all task for getting up-and-running in a new location.
* Usage: `gulp setup`
* tools:
    - `sass`
    - `scripts`
    - `staticjs`
    - `fonts`
    - `images`
    - `svg`