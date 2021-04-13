module.exports = app => {
    const controller = app.controllers.users;

    app.route('/v2/user/login')
        .get(controller.userLogin);

    app.route('/v2/users/list')
        .get(controller.usersList);
}
