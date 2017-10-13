'use strict';

const _ = require('lodash');
const ajax = require('./ajax');

/**
 * @module RestResource
 *
 * uses a config object to initialize, structure:
 * {
 *    authHeader: object, ex. {"Authorization": 'IBSSO #{ibssoToken}'}
 *    loginUrl: string, ex. '#{config.accountsUrl}/login?callback=#{thisUrl}'
 *    appApiPath: string, ex. '#{config.omniApiPath}'
 *    ajaxOptions: object, ex. {timeout: 10000, retry: 1}
 * }
 **/
module.exports = function(c) {
    // make it a constant so we do not accidentally mutate it
    const config = c;
    const headers = _.merge({}, config.authHeader, config.clientHeaders);

    const defaultOptions = _.merge({
        cache: false,
        dataType: 'json',
        contentType: 'application/json',
        accept: 'application/json',
        headers: headers,
        //headers: _.merge(headers, { 'accept-features' : 'mock' }), /*TODO make a mock/prod switch*/
        statusCode: {
            // To test this, be sure you are not doing cross-domain requests
            // otherwise statusCode will be 0!
            401: function() {
                window.location = config.loginUrl;
            }
        },
        timeout: 30000,
        retry: 1,
        stringifyPayload: false
    }, config.ajaxOptions);

    function req(resource, data, options, method) {
        const opts = _.merge({}, defaultOptions, options, {
            method: method,
            url: _.get(options, 'appApiPath', config.appApiPath) + resource
        });

        if (data != null) {
            opts.data = (method !== 'GET' && opts.stringifyPayload) ?
                JSON.stringify(data) : data;
        }

        return ajax(opts, opts.retry);
    }

    return {
        constants: {
            DEFAULT_RETRY: 3
        },

        get(resource, data, options) {
            return req(resource, data, options, 'GET');
        },

        post(resource, data, options) {
            return req(resource, data, options, 'POST');
        },

        put(resource, data, options) {
            return req(resource, data, options, 'PUT');
        },

        patch(resource, data, options) {
            return req(resource, data, options, 'PATCH');
        },

        delete(resource, data, options) {
            return req(resource, data, options, 'DELETE');
        }
    };
};
//# sourceMappingURL=RestResource.js.map
