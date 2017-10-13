const _ = require('lodash');

const dashboardFields = ['id', 'title', 'author', 'gender'];

const fromBackend = payload => {
    const dashboard = {
        ..._.pick(payload, dashboardFields),
    };

    return dashboard;
};

const toBackend = compiled => {
    const dashboard = {
        ..._.pick(compiled, dashboardFields),
    };

    return dashboard;
};

module.exports = {
    toBackend,
    fromBackend
};
