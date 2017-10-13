'use strict';

const $ = require('jquery');
const _ = require('lodash');

/**
 * @module Util
 *
 * uses a config object to initialize, structure:
 * {
 *    protocol: string, ex. 'http' | 'https', usually '#{protocol}'
 * }
 **/
module.exports = function(c) {
    // make it a constant so we do not accidentally mutate it
    const config = c;

    /**
     * Calculates how many table should be placed on a site
     * @param innerNodes
     * @param rowsToDeduct
     * @param rowSizeInPx
     * @return On success : number of table rows , on failure : bool false*/
    const rowsPerPage = function(innerNodes, rowsToDeduct, rowSizeInPx) {

        if ($.type(rowSizeInPx) === 'undefined') {
            rowSizeInPx = 40;
        }

        if ($.type(rowsToDeduct) === 'undefined') {
            rowsToDeduct = 0;
        }

        if (innerNodes.length > 0) {
            const nodeHeight = _.reduce(innerNodes, function(memo, node) {
                return memo + $(node).height();
            }, 0);
            const rows = Math.floor((window.innerHeight - nodeHeight) / rowSizeInPx);
            return rows - rowsToDeduct;
        }

        return false;
    };

    const applyProtocol = function(url) {
        return url ? config.protocol + url.replace(/^http(s)*/, '') : url;
    };

    const getURLParameterByName = function(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? undefined : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    function b(a) {
        return a ? (a ^ Math.random() * 16 >> a / 4).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, b);
    }

    /**
     * nrAddPageAction
     *
     * Depends on the global window object, will determine if NewRelic is enabled or not by lookup
     * @TODO remove global deps
     *
     * @access public
     * @param {string} actionName const (enum) representing the required action
     * @param {object} customAttributes custom attributes to send with the action to NewRelic, we will merge accountKey/ibssoToken/enrollToken into the object, those will be extracted from the global config object {account: {key: xxx}, enrollmentToken: xxx, ibssoToken: xxx}
     */
    function nrAddPageAction(actionName, customAttributes) {
        if (window.newrelic) {
            const _customAttributes = _.merge({
                accountKey: c.account.key,
                ibsso: c.ibssoToken || 'not authenticated',
                ibesso: c.enrollmentToken || 'not enrolled'
            }, customAttributes);
            window.newrelic.addPageAction(actionName, _customAttributes);
        }
    }

    return {
        rowsPerPage: rowsPerPage,
        applyProtocol: applyProtocol,
        getURLParameterByName: getURLParameterByName,
        getUUID: b,
        nrPageAction: nrAddPageAction
    };
};
