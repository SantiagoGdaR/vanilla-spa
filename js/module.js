'use strict';

function Module(scriptElement, installFunction, uninstalFunction) {
    try {
        if(!scriptElement || !installFunction) {
            throw 'error: scriptElement and installFunction params are mandatories';
        }
        this.constructor(scriptElement, installFunction, uninstalFunction);
    } catch (e) {
        console.error(e);
    }
}

Module.prototype = {
    install: undefined,
    uninstall: undefined,
    constructor: function (scriptElement, installFunction, uninstalFunction) {
        this.install = installFunction;
        this.uninstall = uninstalFunction;

        var evt = new CustomEvent('moduleCreated', { detail: this });
        scriptElement.dispatchEvent(evt);
    }
}