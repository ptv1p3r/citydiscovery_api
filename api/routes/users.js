module.exports = app => {
    const controller = app.controllers.users;

    app.route('/v1/user/login')
        .get(controller.userLogin);
}
