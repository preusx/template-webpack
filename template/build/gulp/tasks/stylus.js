import gulp from 'gulp'

import { errorPipeWrapper } from './utils'
import { P as p, R as r } from '../../paths'

export const src = `${p.src.stylus}style.styl`
export const glob = `${p.src.stylus}**/*.styl`

export const dev = function (done) {
  let stylus         = require('gulp-stylus')
  let sourcemaps     = require('gulp-sourcemaps')
  let postcss        = require('gulp-postcss')

  // Useful stuff for docs generation:
  // mdcss[https://github.com/jonathantneal/mdcss]

  errorPipeWrapper(gulp.src(src))
    .pipe(sourcemaps.init())
      .pipe(stylus(require('../../config/stylus').config))
      .pipe(postcss(require('../../config/postcss').config))
    .pipe(sourcemaps.write())
  .pipe(gulp.dest(p.dest.stylus))
  .on('end', done)
}

export const watch = function (task) {
  let watcher = require('gulp-watch')
  let batch = require('gulp-batch')

  watcher(glob, batch((events, done) => gulp.start(task, done)))
}
