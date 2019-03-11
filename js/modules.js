'use strict';

function Modules() {
    this.constructor();
}

Modules.prototype = {
    loadedModules: undefined,
    constructor: function(){
        this.loadedModules = {};
    },
    getModule: function (moduleName) {
        var scope = this;
        return new Promise(function(resolve, reject) {
            if (scope.loadedModules[moduleName]){
                resolve(scope.loadedModules[moduleName]);
            } else {
                var script = document.createElement('script');
                script.addEventListener('moduleCreated', function (e) {
                    scope.addModule(e.target.src, e.detail);
                    resolve(e.detail);
                });
                script.src = moduleName;
                document.body.appendChild(script);
            }
        });
    },
    addModule: function (src, module) {
        var currentUrl = window.location.href;
        currentUrl = currentUrl.substring(0, currentUrl.indexOf(window.location.hash));
        currentUrl = currentUrl.substring(0, currentUrl.lastIndexOf('/') + 1);
        this.loadedModules[src.substring(currentUrl.length)] = module;
    }
}
