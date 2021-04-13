module.exports = app => {
    const controller = app.controllers.common;

    app.route('/')
        .get(controller.hello);

    app.route('/v2/')
        .get(controller.index);

}
