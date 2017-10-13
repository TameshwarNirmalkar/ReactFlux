'use strict';

const _ = require('lodash');
const $ = require('jquery');

$.support.cors = true;

let isLeavingPage = false;
window.onbeforeunload = function() {
    isLeavingPage = true;
};

const abortablePromises = {};

/**
 * jQuery promise
 *
 * @external JqueryPromise
 * @see {@link http://api.jquery.com/Types/#Promise}
 */

/**
 * @param {Object}  opts - Options that will also be passed to $.ajax
 * @param {String}    opts.url
 * @param {String}    opts.method
 * @param {Object}    [opts.headers]
 * @param {Boolean}   [opts.abortPrevious] - Abort or not previous request to the same url (great for autocomplete and etc.)
 * @param {Number}  attempt
 *
 * @returns {JqueryPromise}
 */
module.exports = function ajax(opts, attempt) {
    let jqXHR;

    const deferred = $.Deferred();
    const promise = deferred.promise();
    const abortCallbacks = $.Callbacks('once memory');

    promise.aborted = (cb) => {
        abortCallbacks.add(cb);
        return promise;
    };

    promise.abort = () => {
        jqXHR.abort();
    };

    if (opts.abortPrevious) {
        const key = opts.method + opts.url;

        if (abortablePromises[key]) {
            abortablePromises[key].abort();
        }

        abortablePromises[key] = promise;

        const freeMemory = () => {
            if (abortablePromises[key] === promise) {
                delete abortablePromises[key];
            }
        };

        promise.done(freeMemory).fail(freeMemory).aborted(freeMemory);
    }

    const tryAjax = () => {
        jqXHR = $.ajax(opts).done(deferred.resolve).fail(onFail);
    };

    const onFail = (jqXHR, textStatus, errorThrown) => {
        // In jQuery 1.8+, aborted XHR are considered failed, but we
        // ignore them.
        // If user is leaving and ther's no thrown error,
        // ignore request. Fixes IMW-550.
        if (textStatus === 'abort' || !errorThrown && isLeavingPage) {
            promise.isAborted = true;
            return abortCallbacks.fire();
        }

        // try without X-Request-ID
        if (jqXHR.status >= 500 && _.has(opts.headers, 'X-Request-ID')) {
            opts = {...opts};
            opts.headers = _.omit(opts.headers, 'X-Request-ID');
            return tryAjax();
        }

        if (--attempt > 0) {
            return tryAjax();
        }

        deferred.reject(jqXHR, textStatus, errorThrown);
    };

    tryAjax();


    return promise;
};
