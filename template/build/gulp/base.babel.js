// import gulp from 'gulp';
// import watch from 'gulp-watch';
// import batch from 'gulp-batch';
// import { P as p, R as r } from './tasks/paths';

// import stylus from './tasks/pipelines/stylus'
// import pug from './tasks/pipelines/pug'


// let configs = {
//   postcss: require('./tasks/config/postcss'),
//   stylus: require('./tasks/config/stylus'),
// }

// let paths = {
//   stylus: [
//     `${p.src.stylus}style.styl`,
//     ],
//   stylus_watch: `${p.src.stylus}**/*.styl`,

//   pug: [
//     `${p.src.pug}**/*.pug`,
//     `!${p.src.pug}**/_*.pug`,
//     ],

//   templates: [
//     `${p.src.pug}templates/**/*.pug`,
//     `!${p.src.pug}templates/**/_*.pug`,
//     ],
//   templates_changed: `${p.src.pug}templates/`,
//   templates_dest: `${r.dest}markup/templates/`,
//   templates_changed: `${r.dest}markup/templates/`,

//   copy: [
//     `${p.src.public}**/*.*`,
//     ],

//   js: [
//     `${p.src.js}**/*.js`,
//     ],
// };

// gulp.task('stylus', () => {
//   return stylus(gulp.src(paths.stylus))
//     .pipe(gulp.dest(p.dest.stylus));
// });

// gulp.task('templates', () => {
//   return pug(gulp.src(paths.templates), {
//         pug: {
//             changed: paths.templates_changed,
//             basedir: p.src.pug + 'templates/',
//         },
//         ext: '.jinja'
//     })
//     .pipe(gulp.dest(paths.templates_dest));
// });

// gulp.task('copy', () => {
//   return (new CopyTask())
//     .pipes(gulp.src(paths.copy))
//     .pipe(gulp.dest(p.dest.public));
// });


// gulp.task('watch', () => {

//   watch(paths.templates, batch((events, done) => gulp.start('templates', done) ));
//   watch(paths.copy, batch((events, done) => gulp.start('copy', done) ));

//   // gulp.watch(
//   //   [].concat(paths.stylus, paths.pug, paths.copy, paths.js)
//   //   ).on('change', browserSync.reload);
// });



// import gulp from 'gulp'

// gulp.task('copy', x => {
//   return ''
// })

import gulp from 'gulp'

import * as stylus from './tasks/stylus'
import * as templates from './tasks/templates'


gulp.task('stylus', stylus.dev)
gulp.task('templates', templates.dev)

gulp.task('watch', (done) => {
  stylus.watch('stylus')
  templates.watch('templates')

  done()
});

gulp.task('default', ['watch']);
