css-generator-sass-gulp
=======================

Project that generates the CSS used for Podcastpedia.org from Sass (.scss). The build tool used is Gulp. 
``
### Install and run the project
#### 1. Install [Node.js](http://nodejs.org/) on your machine
#### 2. Install gulp globally
`npm install -g gulp`
#### 3. Install gulp in your project devDependencies
`npm install --save-dev gulp`
#### 4. Install the required gulp plugins
`npm install --save-dev gulp-util gulp-sass gulp-minify-css gulp-rename gulp-autoprefixer`
#### 5. Run gulp tasks in your project's root to generate css or watch the files for modication (it automatically generates css by modification)
* `gulp sass` or just `gulp`
* `gulp watch`