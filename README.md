[![Build Status](https://travis-ci.org/tomhazledine/tabularasa.svg?branch=master)](https://travis-ci.org/tomhazledine/tabularasa)

# Tabula Rasa

Hi. I'm a starter theme called `Tabula Rasa`. I'm based on `_s` (or `underscores`, if you like), the super-smart [starter theme built and maintained by the folks at Automattic](http://underscores.me).


## Gulp

I use Gulp to manage my assets (CSS, SVGs, Javascript, theme-images).

Run `npm install` to set up the Gulp environment, then `gulp setup` to initialise the asset files.

Assets are compiled into the "/assets" folder using sources in the "/uncompressed" folder.

### Gulp Usage

Run `gulp` to activate the Gulp task. This watches all the files in the "/uncompressed" folder, and triggers tasks as-needed.

There are also a few standalone commands that can be run:

* `gulp setup` will run everything and set up the initial environment.
* `gulp staticjs` will set up static javascript assets.
* `gulp jslint` will run all javascript in the "/uncompressed/js/custom" folder through a JS linter.
* `gulp scsslint` will run all Sass in the "/uncompressed/scss" folder through an SCSS linter.
* `gulp test` will output a the message "testing with colour", where "colour" will appear cyan.
* `gulp svg` will compile any SVG files in the "/uncompressed/icons" folder into an SVG Sprite.
* `gulp images` optimises images in the "/uncompressed/images" folder.
* `gulp fonts` simply copies font files from "/uncompressed/fonts" to "/assets/fonts" (so we can keep all source files in one dir. and don't need to manually move them). 
* `gulp scripts` concatenates and minifies JS files, starting with "/uncompressed/js/vendor" and ending with "/uncompressed/js/custom" (to preserve source-order)
* `gulp sass` concatenates and minifies SCSS files in "/uncompressed/scss". It also runs them through Autoprefixer to apply missing browser-prefixes.

## CSS

My ultra-minimal CSS might make me look like theme tartare but that means less stuff to get in your way when you're designing your awesome theme. Here are some of the other more interesting things you'll find here:

* A just right amount of lean, well-commented, modern, HTML5 templates.
* A helpful 404 template.
* A custom header implementation in `inc/custom-header.php` just add the code snippet found in the comments of `inc/custom-header.php` to your `header.php` template.
* Custom template tags in `inc/template-tags.php` that keep your templates clean and neat and prevent code duplication.
* Some small tweaks in `inc/extras.php` that can improve your theming experience.
* A script at `js/navigation.js` that makes your menu a toggled dropdown on small screens (like your phone), ready for CSS artistry. It's enqueued in `functions.php`.
* 2 sample CSS layouts in `layouts/` for a sidebar on either side of your content.
* Smartly organized starter CSS in `style.css` that will help you to quickly get your design off the ground.
* Licensed under GPLv2 or later. :) Use it to make something cool.
