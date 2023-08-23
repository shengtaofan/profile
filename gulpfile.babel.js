import loadPlugins from 'gulp-load-plugins'
import g from 'gulp' //加載gulp-前綴相關套件 使用套件以 $ 引用
import autoprefixer from 'autoprefixer'
import bower from 'main-bower-files'
import server from 'browser-sync'
import minimist from 'minimist'
import del from 'del'
import imageminJpegRecompress from 'imagemin-jpeg-recompress'
import imageminPngquant from 'imagemin-pngquant'
const sync = server.create()
const $ = loadPlugins()

const lib = './plugin/*.js'
let options = minimist(process.argv.slice(2), {
  string: 'env',
  default: { env: 'develop' }
})
const bool = options.env === 'build' //判斷環境變數  true: gulp env --build  false: gulp
// 單一任務 gulp pug --env build
function eslintFixed(file) {
  return file.eslint != null && file.eslint.fixed
}

function html(path,cached) {
  g.src('./src/*.pug',cached)
    .pipe($.plumber()) // gulp-plumber: 編輯錯誤避免中斷cmd執行
    .pipe($.pug({ doctype: 'html' })) // gulp-pug: pretty壓縮html檔
    .pipe($.replace('../img/', './img/'))
    .pipe($.replace('.pug', '.html'))
    .pipe(g.dest('./dist/'))
    .pipe(sync.stream()) //browserSync:更新檔案後重整preview
}

export const pug = cb => {
  html('./src/*.pug',{since: g.lastRun(pug)})
  cb()
}

export const template = cb => {
  html('./src/template/page/**.pug')
  cb()
}

export const sass = cb => {
  g.src('./src/sass/**/*.s+(a|c)ss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init()) //gulp-sourcemaps: 初始化
    .pipe($.sassLint())
    .pipe($.sassLint.format())
    .pipe($.sassLint.failOnError())
    .pipe($.sass().on('error', $.sass.logError))
    .pipe($.if(bool, $.groupCssMediaQueries()))
    .pipe($.replace('../../img/', '../img/'))
    .pipe($.postcss([autoprefixer()])) //gulp-postcss+autoprefixer設定瀏覽器版號
    .pipe($.if(bool, $.cleanCss({ level: 2 }), $.sourcemaps.write('.')))
    .pipe($.if(bool, $.purgecss({ content: ['./dist/**/*.html', './dist/**/*.vue', './dist/**/*.js'] })))
    .pipe(g.dest('./dist/css'))
    .pipe(sync.stream())
  cb()
}

export const babel = cb => {
  g.src('./src/js/**/*.js')
  .pipe($.plumber())
  .pipe($.sourcemaps.init())
  .pipe($.eslint({ fix: true, rules:{ 'no-undef': 0,'no-unused-vars': 0 }  }))
  .pipe($.eslint.format())
  .pipe($.eslint.failAfterError())
  .pipe($.if(eslintFixed, g.dest('./src/js/')))
  .pipe($.babel({ presets: ['@babel/preset-env']})) //["@babel/preset-env"] //gulp-babel @babel/preset-env @babel/core
  .pipe($.concat('script.js')) //gulp-concat:合併檔案
  .pipe($.if(bool, $.uglify({ compress: { drop_console: true } }) , $.sourcemaps.write('.'))) //gulp-uglify: 壓縮js並清除console
    .pipe(g.dest('./dist/js'))
    .pipe(sync.stream())
  cb()
}

export const vendors = cb => {
  g.src([...bower(), lib]) //main-bower-files:抓取套件主檔案
    .pipe($.order(['svgxuse.js', 'jquery.js', 'popper.js', 'bootstrap.js']))
    .pipe($.concat('vendors.js'))
    .pipe($.uglify())
    .pipe(g.dest('./dist/js', { sourcemaps: false }))
  cb()
}

export const browserSync = cb => {
  sync.init({port:80, server: { baseDir: './dist' }, reloadDebounce: 1500 })
  cb()
}
export const imageMin = cb => {
  g.src('./src/img/*.{jpg,png,gif,svg}', {since: g.lastRun(imageMin)})
    .pipe(
      $.if(
        bool,
        $.imagemin([
          $.imagemin.gifsicle(),
          $.imagemin.svgo(),
          imageminJpegRecompress({
            loops: 6,
            min: 40,
            max: 85,
            quality: 'low'
          }),
          imageminPngquant({ speed: 1, quality: [0.4, 0.6] })
        ])
      )
    )
    .pipe(g.dest('./dist/img'))
    .pipe(sync.stream())
  cb()
}
export const font = cb => {
  g.src(['./src/font/**/*'])
  .pipe(g.dest('./dist/font'))
  cb()
}
export const move = cb => {
  g.src(['./static/**/*.{txt,xml}',])
  .pipe(g.dest('./dist'))

  cb()
}

export const nojekyll = cb => {
  require('fs').writeFileSync('dist/.nojekyll','')
  cb()
}

export const deploy = cb => {
  g.src('./dist/**/*')
  .pipe($.ghPages())
  cb()
}
export const clean = cb => {
  del([ './dist/**/*.map'], { read: false })
  cb()
}
export function watch() {
  g.watch('./src/*.pug', pug)
  g.watch('./src/template/*.pug', template)
  g.watch('./src/sass/**/*.s+(a|c)ss', sass)
  g.watch('./src/js/**/*.js', babel)
  g.watch('./src/img/**/*.{jpg,png,gif}', imageMin)
}
exports.default = g.parallel(
  pug,
  sass,
  babel,
  vendors,
  watch,
  browserSync
)
exports.build = g.series(clean, pug, babel, font, move, nojekyll, sass)

exports.assets = g.parallel(imageMin)