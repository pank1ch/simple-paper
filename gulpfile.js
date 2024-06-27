import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import squoosh from 'gulp-libsquoosh';
import terser from 'gulp-terser';
import svgo from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import del from 'del';


// Styles

export const styles = () => {
  return gulp.src('source/less/style.less', { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// HTML

const html = () => {
  return gulp.src('source/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('build'));

}


const scripts = () => {
  return gulp.src('source/js/*.js')
  .pipe(terser())
  .pipe(gulp.dest('build/js'));


}


//images

const optimizeImages = () => {
  return gulp.src('source/images/**/*.{jpg,png}')
  .pipe(squoosh())
  .pipe(gulp.dest('build/images'));

}

//copyImages

const copyImages = () => {
  return gulp.src('source/images/**/*.{jpg,png}')
  .pipe(gulp.dest('build/images'));

}

//svg

const svg = () => {
  return gulp.src(['source/images/**/*.svg', '!source/images/icons/*.svg'])
  .pipe(svgo())
  .pipe(gulp.dest('build/images'));

}

const sprite = () => {
  return gulp.src('source/images/icons/*.svg')
  .pipe(svgo())
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('build/images'));
}

//WEBP

const createWebp = () => {
  return gulp.src('source/images/**/*.{jpg,png}')
  .pipe(squoosh({
    webp: {}
  }))
  .pipe(gulp.dest('build/images'));

}


// copy

const copy = () =>{
  return gulp.src([
    'source/fonts/*.{woff2,woff}',
    'source/*.ico',
    'source/*.webmanifest',
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'))
  done();

}

// clean

const clean = () =>{
  return del('build');

}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

//Reload

const reload = (done) =>{
  browser.reload;
  done();
}


// Watcher

const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/js/*.js', gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html, reload));
}


export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    sprite,
    createWebp
  ),
);



export default gulp.series
(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    sprite,
    createWebp
  ),
  gulp.series(
  server,
  watcher
));
