/*We disable ESLint for index.js files in libraries since they have to be plain JavaScript, ie. no ES6 etc.*/
/*eslint-disable*/
// 'use strict';

const AppDispatcher = require('flux').Dispatcher;
const DTColors = require('./DTColors');
const Format = require('./Format');
const RestResource = require('./RestResource');
const Util = require('./Util.js');
const Validate = require('./Validate.js');
const AuditLog = require('./AuditLog');

module.exports = {
    AppDispatcher: new AppDispatcher(),
    DTColors: DTColors,
    Format: Format,
    RestResource: RestResource,
    Util: Util,
    Validate: Validate,
    AuditLog: AuditLog
};
