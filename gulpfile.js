let projectFodler = require('path').basename(__dirname);
let sourceFolder = 'app';

let path = {
    // Место куда я буду выгружать готовые файлы
    build: {
        html: projectFodler + '/',
        css: projectFodler + '/css/',
        js: projectFodler + '/js/',
        img: projectFodler + '/images/',
        fonts: projectFodler + '/fonts/',
    },
    // Файлы для разработки 
    src: {
        html: sourceFolder + '/',
        css: sourceFolder + '/scss/style.scss',
        js: sourceFolder + '/js/main.js',
        img: sourceFolder + '/images/**/*',
        fonts: sourceFolder + '/fonts/**/*.ttf',
    },
    // Пути куда я буду выгружать файлы .min
    dest: {
        html: sourceFolder + '/',
        css: sourceFolder + '/css/',
        js: sourceFolder + '/js/',
        fonts: sourceFolder + '/fonts/',
    },
    // Файлы за которым будет следить browsersync
    watch: {
        html: sourceFolder + '/**/*.html',
        css: sourceFolder + '/scss/**/*.css',
        js: sourceFolder + '/js/**/*.js',
        img: sourceFolder + '/images/**/*.{jpg, png, svg, ico, webp}',
    },
    clean: `./${projectFodler}/`
};


const   { src, dest, watch, parallel, series }  = require('gulp');

let fs = require('fs');

const   scss            = require('gulp-sass');
const   concat          = require('gulp-concat');
const { reload }        = require('browser-sync');
const   browserSync     = require('browser-sync').create();
const   uglify          = require('gulp-uglify-es').default;
const   autoprefixer    = require('gulp-autoprefixer');
const   imagemin        = require('gulp-imagemin');
const   del             = require('del');
const   sourcemaps      = require('gulp-sourcemaps');
const   ttf2woff        = require('gulp-ttf2woff');
const   ttf2woff2       = require('gulp-ttf2woff2');
const   fonter          = require('gulp-fonter');

function browsersync() {
    browserSync.init ({
        server : {
            baseDir: sourceFolder + '/'
        }
    });
}

function cleanDist() {
    return del(projectFodler)
}

function images() {
    return src(path.src.img)
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(dest(path.build.img))
}

function scripts() {
    return src(path.src.js)
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(dest(path.dest.js))
        .pipe(browserSync.stream())
}

function styles() {
    return src(path.src.css)
        .pipe(sourcemaps.init())
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(dest(path.dest.css))
        .pipe(browserSync.stream())
}

function fonts() {
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.dest.fonts))
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.dest.fonts))
}

function otfttf() {
    return src( sourceFolder + '/fonts/**/*.otf')
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest(path.dest.fonts))
}

function build() {
    return src([
        sourceFolder + '/css/style.min.css',
        sourceFolder + '/fonts/**/*',
        sourceFolder + '/js/main.min.js',
        sourceFolder + '/libs/**/*',
        sourceFolder + '/video/**/*',
        sourceFolder + '/favicon/**/*',
        sourceFolder + '/*.html',
    ], {base: sourceFolder})
        .pipe(dest(projectFodler))
}

function watching() {
    watch([ sourceFolder + '/scss/**/*.scss'], styles);
    watch([path.watch.css], styles);
    watch([path.watch.js, `!${sourceFolder}/js/main.min.js`], scripts);
    watch([path.watch.html]).on('change', browserSync.reload);
}


exports.styles = styles;
exports.fonts = fonts;
exports.otfttf = otfttf;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.images = images;
exports.cleanDist = cleanDist;


exports.build = series(cleanDist, images, build);

exports.default = parallel(browsersync, watching, scripts, styles );

exports.fonts = parallel(otfttf, fonts );

