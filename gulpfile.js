/**************************************************************************
* VALUES
**************************************************************************/
var project = {
    name    : "angular",
    version : "0.0.1-SNAPSHOT"
}
/**************************************************************************
* IMPORT
**************************************************************************/
var gulp       = require('gulp');
var webserver  = require('gulp-webserver');
var uglify     = require('gulp-uglify');
var concat     = require('gulp-concat');
var clean      = require('gulp-clean');
var del        = require('del');
var watch      = require('gulp-watch');
var sourcemaps = require('gulp-sourcemaps');
var minifyCss  = require('gulp-minify-css');
var htmlmin    = require('gulp-minify-html');
var gulpIgnore = require('gulp-ignore');
var zip        = require('gulp-zip');

/**************************************************************************
* VALUES
**************************************************************************/
var node_modules    = './node_modules'; 
var src             = './src'; 
var target          = './target';
var dist            = target+'/dist';


/**************************************************************************
* TASK
**************************************************************************/
gulp.task('clean', function () {
    del(dist+'/**', {force:true});
});



gulp.task('build-main-vendors', function () {
    gulp.src(
            [   node_modules+'/jquery/dist/jquery.min.js',
            	node_modules+'/bootstrap/dist/js/bootstrap.min.js',
            	node_modules+'/core-js/client/shim.min.js',
                node_modules+'/zone.js/dist/zone.min.js',
                node_modules+'/systemjs/dist/system.js',
                node_modules+'/chartjs/chart.js',
                node_modules+'/d3/dist/d3.min.js',
                node_modules+'/moment/min/moment.min.js'
            ]
            )
        .pipe(uglify())
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest(dist+'/js/vendors/'));
});
gulp.task('copy-vendors-angular', function () {
    gulp.src(node_modules+'/@angular/*/bundles/*.js')
               .pipe(gulpIgnore.exclude('**/*testing*'))
               .pipe(gulp.dest(dist+'/js/vendors/@angular'));

               
    gulp.src(node_modules+'/core-js/**/*.js')
               .pipe(gulp.dest(dist+'/js/vendors/core-js'));
               
    gulp.src(node_modules+'/plugin-typescript/**/*.js')
               .pipe(uglify())
               .pipe(gulp.dest(dist+'/js/vendors/plugin-typescript'));

    gulp.src(node_modules+'/typescript/**/*.js')
               .pipe(uglify())
               .pipe(gulp.dest(dist+'/js/vendors/typescript'));


    gulp.src(node_modules+'/zone.js/**/*.js')
               .pipe(gulp.dest(dist+'/js/vendors/zone.js'));
    
    gulp.src(node_modules+'/angular-in-memory-web-api/**/*.js')
               .pipe(gulp.dest(dist+'/js/vendors/angular-in-memory-web-api'));


   

});
gulp.task('copy-vendors-rx', function () {
    gulp.src(node_modules+'/rxjs-system-bundle/**/*.js')
               .pipe(gulp.dest(dist+'/js/vendors/rxjs-system-bundle'));     
});

gulp.task('copy-vendors-css', function () {
    gulp.src([node_modules+'/bootstrap/**/bootstrap.min.css',
    		  node_modules+'/primeng/resources/primeng.min.css',
    		  node_modules+'/primeng/resources/themes/nova-light/theme.css'
    		 ])
               .pipe(concat('vendors.css'))
               .pipe(minifyCss())
               .pipe(gulp.dest(dist+'/css'));
});

gulp.task('copy-vendors-resources', function () {
    gulp.src(node_modules+'/primeicons/fonts/*')
        .pipe(gulp.dest(dist+'/fonts'));

    gulp.src(node_modules+'/primeng/resources/images/*')
    	.pipe(gulp.dest(dist+'/images'));    

    gulp.src(node_modules+'/primeng/resources/themes/nova-light/fonts/*')
    	.pipe(gulp.dest(dist+'/fonts'));

});

gulp.task('copy-vendors'  , ['build-main-vendors','copy-vendors-angular', 'copy-vendors-rx','copy-vendors-css','copy-vendors-resources']);



/**************************************************************************
* TASK APP
**************************************************************************/
gulp.task('copy-resources-app-css', function () {
    gulp.src(src+'/**/*.css')
               .pipe(sourcemaps.init())
               .pipe(concat('application.css'))
               .pipe(minifyCss())
               .pipe(sourcemaps.write('./'))
               .pipe(gulp.dest(dist+'/css'));
});
gulp.task('copy-resources-app-bootjs', function () {
    gulp.src(src+'/js/system.boot.js')
               .pipe(sourcemaps.init())
               .pipe(sourcemaps.write('./maps'))
               .pipe(gulp.dest(dist+'/js'));
});

gulp.task('copy-resources-html', function () {
    gulp.src(src+'/**/*.html')
               .pipe(htmlmin())
               .pipe(gulp.dest(dist));
});


gulp.task('copy-resources-app', function () {
    gulp.src([src+'/**/*.ts',src+'/js/app/**/*.js' ])
               .pipe(gulp.dest(dist));
});

gulp.task('zip-artifact', function () {
    //project.name+'-'+project.version+'.zip'
    return gulp.src('./target/dist/**/*')
    .pipe(zip('test.zip'))
    .pipe(gulp.dest(target));
});

/**************************************************************************
* WATCH
**************************************************************************/
gulp.task('watch-css', function() {
    return gulp.watch(src+'/**/*.css', ['copy-resources-app-css']);
});
gulp.task('watch-html', function() {
    return gulp.watch(src+'/**/*.html', ['copy-resources-html']);
});
gulp.task('watch-app-bootjs', function() {
    gulp.watch(src+'/js/system.boot.js', ['copy-resources-app-bootjs']);
});
gulp.task('watch-js', function() {
   
});
gulp.task('watch-ts', function() {
    gulp.watch(src+'/**/*.ts', ['copy-resources-app']);
});


/**************************************************************************
* SERVE
**************************************************************************/
gulp.task('run-webserver', function() {
    gulp.src('./target/dist/')
      .pipe(webserver({
        livereload: true,
        directoryListing: false,
        open: true
    }));
});


/**************************************************************************
* MACRO TASK
**************************************************************************/
gulp.task('copy-resources'  , ['copy-vendors', 'copy-resources-app-css','copy-resources-app-bootjs','copy-resources-html','copy-resources-app']);
gulp.task('compile'         , ['copy-resources']);
gulp.task('package'         , ['compile','zip-artifact']);
gulp.task('default'         , ['package']);
gulp.task('watch'           , ['watch-css','watch-html','watch-js','watch-ts']);

gulp.task('serve'           , ['run-webserver','watch']);



