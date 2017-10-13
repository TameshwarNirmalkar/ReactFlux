'use strict';

const _ = require('lodash');

/**
 * Audit Log service that allows system to record various events though AJAX api.
 * Requires every other component to implement settingsApiPath in config.
 * Requires every other component to provide its appId in config.
 */

module.exports = function (config) {

    if (_.isUndefined(config.settingsApiPath) || _.isUndefined(config.applicationKey)) {
        throw new Error('Error while initializing AuditLog service. Provide required configuration values.');
    }

    const RestService = require('./RestResource')(_.merge({}, config, {
        appApiPath: config.settingsApiPath
    }));
    const resourcePath = '/audit';

    /**
     * Main log functions that forwards requests to backend
     * @method _ajaxLog
     * @param {string} event - event string
     * @param {Object} args  - Object containing data for string interpolation
     * @return {Promise}
     */
    const _ajaxLog = function (event, args) {
        return RestService.post(resourcePath, {applicationKey: config.applicationKey, event: event, args: args}, {stringifyPayload: true})
            .then(() => {
                if (config.isDebug) {
                    console.info('[AuditLog] Event recorded.');
                }
            }, (err) => {
                throw new Error('Error while recording AuditLog', err);
            });
    };

    return {
        log: _ajaxLog
    };

};
