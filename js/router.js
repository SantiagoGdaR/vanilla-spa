'use strict';

function Router(routes) {
    try {
        if (!routes) {
            throw 'error: routes param is mandatory';
        }
        this.constructor(routes);
        this.init();
    } catch (e) {
        console.error(e);   
    }
}

Router.prototype = {
    routes: undefined,
    rootElem: undefined,
    currentModule: undefined,
    modules: undefined,
    constructor: function (routes) {
        this.routes = routes;
        this.rootElem = document.getElementById('app');
        this.modules = new Modules();
    },
    init: function () {
        var r = this.routes;
        (function(scope, r) { 
            window.addEventListener('hashchange', function (e) {
                scope.hasChanged(scope, r);
            });
        })(this, r);
        this.hasChanged(this, r);
    },
    hasChanged: function(scope, r){
        if (window.location.hash.length > 0) {
            for (var i = 0, length = r.length; i < length; i++) {
                var route = r[i];
                if(route.isActiveRoute(window.location.hash.substr(1))) {
                    scope.goToRoute(route.htmlName, route.scriptName);
                }
            }
        } else {
            for (var i = 0, length = r.length; i < length; i++) {
                var route = r[i];
                if(route.default) {
                    scope.goToRoute(route.htmlName, route.scriptName);
                }
            }
        }
    },
    goToRoute: function (htmlName, scriptName) {
        if(this.currentModule && this.currentModule.uninstall) {
            this.currentModule.uninstall(this.rootElem);
        }
        this.currentModule = undefined;
        (function(scope) { 
            var viewUrl = 'views/' + htmlName,
                scriptUrl = scriptName ? 'modules/' + scriptName : undefined,
                modulePromise = undefined,
                xhttp = new XMLHttpRequest();
            if (scriptUrl) {
                modulePromise = scope.modules.getModule(scriptUrl);
            }
            xhttp.onreadystatechange = function () {
                if (this.readyState === 4 && this.status === 200) {
                    scope.rootElem.innerHTML = this.responseText;
                    if (modulePromise) {
                        modulePromise.then(function(module) {
                            module.install(scope.rootElem);
                            scope.currentModule = module;
                        });
                    }
                }
            };
            xhttp.open('GET', viewUrl, true);
            xhttp.send();
        })(this);
    }
};