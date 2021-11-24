const newsRouters = require('./news');
const coursesRouters = require('./courses');
const siteRouters = require('./site');
const meRouters = require('./me');

function route(app) {
    app.use('/news', newsRouters);

    app.use('/me', meRouters);

    app.use('/courses', coursesRouters);

    app.use('/', siteRouters);
}

module.exports = route;
