'use strict';

/**
 * @module Validate
 **/
module.exports = function() {

    /**
     * isEmail
     *
     * Check if provided parameter is valid email
     *
     * @access public
     * @param {string} email
     * @return {bool}
     **/
    function isEmail(email) {
        return new RegExp(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i).test(email);
    }

    /**
     * isUrl
     *
     * Check if provided parameter is valid url
     *
     * @access public
     * @param {string} url
     * @return {bool}
     **/
    function isUrl(url) {
        return new RegExp(/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/).test(url);
    }

    /**
     * isMSISDN
     *
     * Check if provided parameter is valid MSISDN
     *
     * @access public
     * @param {number} number
     * @return {bool}
     **/
    function isMSISDN(number) {
        return new RegExp(/^[0-9]+$/).test(number);
    }

    return {
        isEmail: isEmail,
        isUrl: isUrl,
        isMSISDN: isMSISDN
    };
};
