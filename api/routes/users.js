const auth = require('../auth/auth');

module.exports = app => {
    const controller = app.controllers.users;

    app.route('/v2/user/login')
        .post(controller.userLogin);

    app.route('/v2/user/logout')
        .post(auth.verifyJWT, controller.userLogout);

    app.route('/v2/users/list')
        .get(auth.verifyJWT, controller.usersList);
}
