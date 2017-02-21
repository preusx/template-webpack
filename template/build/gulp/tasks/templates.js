import gulp from 'gulp'

import { errorPipeWrapper } from './utils'
import { P as p, R as r } from '../../paths'

export const src = [
  `${p.src.pug}templates/**/*.pug`,
  `!${p.src.pug}templates/**/_*.pug`,
]
export const basedir = `${p.src.pug}templates/`
export const glob = src
export const dest = `${r.dest}markup/templates/`
export const extension = '.html'

export const dev = function (done) {
  var pug              = require('gulp-pug')
  var pugCompiler      = require('pug')
  var changed          = require('gulp-changed')
  var rename           = require('gulp-rename')

  errorPipeWrapper(gulp.src(src))
    .pipe(changed(basedir, {
      extension: extension,
    }))
    .pipe(pug({
      pretty: true,
      pug: pugCompiler,
      basedir: basedir,
    }))
    .pipe(rename({
      extname: extension,
    }))
  .pipe(gulp.dest(dest))
  .on('end', done)
}

export const watch = function (task) {
  let watcher = require('gulp-watch')
  let batch = require('gulp-batch')

  watcher(glob, batch((events, done) => gulp.start(task, done)))
}
