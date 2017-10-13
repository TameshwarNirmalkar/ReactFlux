'use strict';

module.exports = function() {
    const chartsColorPatternMuted = [
        '#dd9d7a', // orange
        '#ad92c4', // purple
        '#9bb363', // green
        '#70bcb1', // teal
        '#999085', // brown
        '#c0b44f', // yellow
        '#c0b44f', // forest green
        '#b0836a', // dark orange
        '#947aaa', // dark purple
        '#839755', // dark green
        '#5d988f', // dark teal
        '#80786f', // dark brown
        '#a69c44', // dark yellow
        '#576b56' // dark forest green
    ];

    const chartsColorPatternVibrant = [
        '#d67d4c', // orange
        '#8d62b2', // purple
        '#7aa417', // green
        '#36b4a1', // teal
        '#efdd44', // yellow
        '#bd6e44', // dark orange
        '#795499', // dark purple
        '#668a13', // dark green
        '#2f9c8b', // dark teal
        '#d6c73c' // dark yellow
    ];

    return {
        chartsColorPatternMuted: chartsColorPatternMuted,
        chartsColorPatternVibrant: chartsColorPatternVibrant
    };
}();

