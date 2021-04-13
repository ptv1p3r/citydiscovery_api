module.exports = app => {
    const usersDB = app.data.users;
    const controller = {};

    controller.userLogin = (req, res) => res.status(200).json(usersDB);

    controller.usersList = (req, res) => res.status(200).json(usersDB);

    return controller;
}
