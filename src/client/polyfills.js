'use strict';

require('babel-polyfill');
require('core-js/es6');
require('core-js/es7/reflect');
if (process.env.ENV === 'production') {
    // Production
} else {
    // Development and test
    Error['stackTraceLimit'] = Infinity;
}
