module.exports = app => {
    const controller = {};
    const formatYmd = date => date.toISOString().slice(0, 10);

    controller.hello = (req, res) => res.status(200).send("<html lang='en'><h1>Welcome to City Guide API v2 - " + formatYmd(new Date()) + " </h1></html>");
    controller.index = (req, res) => res.status(204).json({message: 'No endpoints available'});

    return controller;
}
