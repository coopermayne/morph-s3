# Stack

What defining tools and libraries make up this project's architecture?

## Front-end framework
- [Angular](https://angularjs.org/) with [AngularUI Router](https://github.com/angular-ui/ui-router)

## Preprocessors
- [Jade](http://jade-lang.com/)
- [Sass](http://sass-lang.com/) with [autoprefixer](https://github.com/postcss/autoprefixer-core).

## Build System
- [Gulp](http://gulp.com/)

# Local Setup

## Prerequisites
1. [NodeJS](http://nodejs.org/)
	- `brew install node`
	- use version **6.17.1**
1. [Bower](http://bower.io/)
  - `npm install --global bower`
1. [Gulp](http://gulp.com/)
	- `npm install --global gulp`

## Start Up

1. `npm install`
2. `bower install`
   1. if asked to choose **angular version choose 1.5.5**
3. `gulp`


# File Structure

```
app/
	common-components/
		directives/
			dropdown/
				_dropdown_styles.scss
				dropdown_controller.js
				dropdown_directive.js
				dropdown_template.jade
		filters/
			reverse_filter.js
		services/
	common-styles/
		_base.scss
		_breakpoints.scss
		_mixins.scss
		_reset.scss
		_variables.scss
	states/
		root/
			parent-state-2/
				child-state-1/
					_child-state-1_styles.scss
					child-state-1_controler.js
					child-state-1_module.js
					child-state-1_template.jade
					child-state-1_test-e2e.js
					child-state-1_test-unit.js
				child-state-2/
					_child-state-2_styles.scss
					child-state-2_controler.js
					child-state-2_module.js
					child-state-2_template.jade
					child-state-2_test-e2e.js
					child-state-2_test-unit.js
				_parent-state-2_styles.scss
				parent-state-2_controler.js
				parent-state-2_module.js
				parent-state-2_template.jade
				parent-state-2_test-e2e.js
				parent-state-2_test-unit.js
			state-1/
				_state-1_styles.scss
				state-1_controller.js
				state-1_module.js
				state-1_template.jade
				state-1_test-e2e.js
				state-1_test-unit.js
	app_module.js
	app_styles.scss
	index.jade
bower_components/
build/
images/
node_modules/
tests/
	coverage/
	karma.config.js
	protractor.config.js
.csscomb.json
.eslintrc
.gitignore
.htaccess
bower.json
favicon.png
gulpfile.js
LICENSE
package.json
README.md
scss-linting-config.yml
```

# Build Process

`gulp build`

Building does a number of things:

1. Cleans the build directory by removing all files using [del](https://www.npmjs.org/package/del).
2. Minifies all images using [gulp-imagemin](https://www.npmjs.org/package/gulp-imagemin).
3. Injects Angular dependancy annotations using [ng-annotate](https://github.com/olov/ng-annotate).
4. Concatenates and minifies all JavaScript files using [gulp-concat](https://www.npmjs.org/package/gulp-concat) and [gulp-uglify](https://github.com/terinjokes/gulp-uglify).
5. Concatenates and minifes all stylesheets using [gulp-minify-css](https://github.com/jonathanepollack/gulp-minify-css).
6. Minifies HTML using [gulp-minify-html](https://github.com/jonathanepollack/gulp-minify-html).

# Go live

Use firebase to host files in /build-destination