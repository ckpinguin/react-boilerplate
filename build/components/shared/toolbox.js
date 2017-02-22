'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

/**
 * Logging helper for single variables
 * @param {string} sender - (optional) The calling function (there is no
 * ECMA standard way to use callee/caller in strict mode).
 * @param {*} variable - The var to log to the console
 * @param {string} varName -  Optional, will appear as a label before the var
 */
function dd(variable, varName) {
    var sender = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    var varNameOutput;

    varName = varName || '';
    varNameOutput = varName ? varName + ':' : '';

    console.debug(sender + ' => ' + varNameOutput, variable, ' (' + (typeof variable === 'undefined' ? 'undefined' : _typeof(variable)) + ')');
}

exports.guid = guid;
exports.dd = dd;