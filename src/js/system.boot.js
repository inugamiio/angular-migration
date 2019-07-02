// =====================================================================
// GLOBALES VALUES
// =====================================================================
var CONTEXT_PATH   = "/";
var RESOURCES_PATH = "/js/";
var APP_PATH       = RESOURCES_PATH+"app";
var VENDOR_PATH    = RESOURCES_PATH+"vendors";

// =====================================================================
// SYSTEM JS CONFIG
// =====================================================================
(function(global) {
    SystemJS.typescriptOptions = {
        "target": "es5",
        "module": "system",
        "moduleResolution": "node",
        "sourceMap": true,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "noImplicitAny": true,
        "suppressImplicitAnyIndexErrors": true
    };

    System.config({
        transpiler: 'ts',
        meta: {
            'typescript': {
              "exports": "ts"
            }
        },
        paths: {
            'vendor:': VENDOR_PATH+"/"
          },
        map:{
            "app": 'js/app',
"@angular/core"                     	: "vendor:@angular/core/bundles/core.umd.min.js",
"@angular/common"                   	: "vendor:@angular/common/bundles/common.umd.min.js",
"@angular/compiler"                 	: "vendor:@angular/compiler/bundles/compiler.umd.min.js",
'@angular/platform-browser'             : "vendor:@angular/platform-browser/bundles/platform-browser.umd.js",
"@angular/platform-browser-dynamic" 	: "vendor:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js",

"rxjs" : "vendor:rxjs",
'angular-in-memory-web-api': +"vendor:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js",
'ts': 'vendor:plugin-typescript/lib/plugin.js',
'typescript': 'vendor:typescript/lib/typescript.js',
"core-js": "vendor:core-js"
        },
    packages: {
      'app': { defaultExtension: 'ts' },
      'rxjs/ajax': {main: 'index.js', defaultExtension: 'js' },
      'rxjs/operators': {main: 'index.js', defaultExtension: 'js' },
      'rxjs/testing': {main: 'index.js', defaultExtension: 'js' },
      'rxjs/webSocket': {main: 'index.js', defaultExtension: 'js' },
      'rxjs': { main: 'index.js', defaultExtension: 'js' }
    }
    });


})(this);
