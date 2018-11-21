'use strict';

function Route(name, htmlName, scriptName, defaultRoute) {
    try {
        if(!name || !htmlName) {
            throw 'error: name and htmlName params are mandatories';
        }
        this.constructor(name, htmlName, scriptName, defaultRoute);
    } catch (e) {
        console.error(e);
    }
}

Route.prototype = {
    name: undefined,
    htmlName: undefined,
    scriptName: undefined,
    default: undefined,
    constructor: function (name, htmlName, scriptName, defaultRoute) {
        this.name = name;
        this.htmlName = htmlName;
        this.scriptName = scriptName;
        this.default = defaultRoute;
    },
    isActiveRoute: function (hashedPath) {
        return hashedPath.replace('#', '') === this.name; 
    }
}