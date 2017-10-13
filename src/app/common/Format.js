'use strict';

const moment = require('moment');
const _ = require('lodash');

/**
 * @module Format
 *
 * uses a config object to initialize, structure:
 * {
 *      backendDateFormat: string, ex. "YYYY-MM-DDTHH:mm:ss.SSSZ"
 *      currency: string, ex. '#{currency.symbol || currency.code}' from clientProfile
 * }
 **/
module.exports = function(c) {
    // make it a constant so we do not accidentally mutate it
    const config = c;

    const formatInteger = number => (parseInt(number) || 0).toLocaleString();

    const formatFloat = (number, precision, minimumFractionDigits) => {
        precision = parseInt(precision) || 2;
        // If locale is undefined, then the default locale is used.
        // maximumFractionDigits is needed, because default is 3 and if we leave default,
        // browsers will not show more than 3 decimal digits
        return parseFloat((parseFloat(number) || 0).toFixed(precision)).toLocaleString(undefined, {
            maximumFractionDigits: precision,
            minimumFractionDigits: minimumFractionDigits || 0
        });
    };

    const formatPercentage = (fraction, precision) => {
        let number = (fraction || 0) * 100;
        precision = parseInt(precision) || 0;
        number = (precision === 0 ? Math.floor(number) : parseFloat(number).toFixed(precision));
        return number.toLocaleString() + '%';
    };

    const formatDate = (date, defaultValue = '') => {
        return date != null ? new Date(date).toLocaleString() : defaultValue;
    };

    const formatFromNow = (date, defaultValue = '') => {
        return date == null ?
            defaultValue :
            _.isString(date) ?
                moment(date, config.backendDateFormat).fromNow() :
                moment(date).fromNow();
    };

    const formatCalendar = (date, defaultValue = '') => {
        return date != null ? moment(date, config.backendDateFormat).calendar() : defaultValue;
    };

    const formatUrl = (baseUrl, params) => {
        return baseUrl +
            (baseUrl.indexOf('?') < 0 ? '?' : '&') +
            _.map(params, (value, key) => key + '=' + value).join('&');
    };

    const formatCountInflection = (number, inflectionStrings) => {
        return Math.abs(number) === 1
            ? inflectionStrings[0]
            : inflectionStrings[1];
    };

    const formatCurrency = (number, precision, currencyCode, currencySymbol) => {

        precision = parseInt(precision, 10) || 2;
        currencyCode = currencyCode || config.currencyCode;
        currencySymbol = currencySymbol || config.currencySymbol;
        const localeFull = _getDeepProperty(_.clone(config), 'localeFull');

        try {
            return parseFloat((parseFloat(number) || 0).toFixed(precision)).toLocaleString(localeFull.length ? localeFull : undefined, {
                maximumFractionDigits: precision,
                style: 'currency',
                currency: currencyCode
            });
        } catch (ignoreException) {
            return formatFloat(number, precision) + (currencySymbol || ' ' + currencyCode);
        }
    };

    const toUnixTimeStamp = (currentTime) => {
        return moment(currentTime, config.backendDateFormat).valueOf();
    };

    const formatShortFloat = (number) => {
        if (number < 1000) return number;

        const digitCount = number.toString().length;
        const nonDecimalDigitCount = (digitCount - 1) % 3 + 1;
        const letter = _determineLetter(digitCount);
        const divisor = Math.pow(10, digitCount - nonDecimalDigitCount);

        return (number/divisor).toFixed(3 - nonDecimalDigitCount) + letter;
    };

    const _determineLetter = (digitCount) => {
        switch(~~((digitCount-1) / 3)){
            case 1: return 'k';
            case 2: return 'M';
            case 3: return 'G';
            case 4: return 'T';
            default: return '';
        }
    };

    const _getDeepProperty = (obj, key) => {
        if (_.has(obj, key)) {
            return [obj[key]];
        }

        const values = [];
        _.forEach(obj, v => {
            if (typeof v === 'object' && (v = _getDeepProperty(v, key)).length) {
                values.push.apply(values, v);
            }
        });
        return values;
    };

    return {
        integer: formatInteger,
        float: formatFloat,
        percentage: formatPercentage,
        date: formatDate,
        fromNow: formatFromNow,
        calendar: formatCalendar,
        url: formatUrl,
        countInflection: formatCountInflection,
        toUnixTimeStamp: toUnixTimeStamp,
        currency: formatCurrency,
        shortFloat: formatShortFloat
    };
};
