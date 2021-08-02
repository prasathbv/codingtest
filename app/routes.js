module.exports = function (app) {
    const authentication = require('./authenticate/authentication');
    app.post('/app/authentication/login',authentication.login);
    app.post('/app/authentication/signup',authentication.signup);

    const multiplex = require('./multiplex/crud');

    app.post('/app/multiplex/createshow',multiplex.createshow);
    app.get('/app/multiplex/getallshowinfo',multiplex.getallshowinfo);
    app.post('/app/multiplex/searchshows',multiplex.searchshows);
    app.post('/app/multiplex/updateshow',multiplex.updateshow);
    app.post('/app/multiplex/removeshow',multiplex.removeshow);
}