const jwt = require('jsonwebtoken');

module.exports = app => {
    const usersDB = app.data.users;
    const controller = {};

    // user login
    controller.userLogin = (req, res, next) => {
        // simulate db operations
        if(req.body.user === 'pedro' && req.body.password === '123'){
            // auth ok
            const id = 1;
            const token = jwt.sign(
                {
                    id
                },
                process.env.TOKEN_SECRET,
                {
                    expiresIn: 14400 // 4 hours in seconds
                }
            );
            return res.status(200).json({ok: true, auth: true, id: id, token: token, expire: '14400'});
        }

        res.status(401).json({message:'User credentials mismatch'});
    }

    // user logout
    controller.userLogout = (req, res) => {
        // simulate db operations
        res.status(200).json({ok: true, auth: false,token: null});
    }

    controller.usersList = (req, res, next) => {
        res.status(200).json(usersDB);
    }

    return controller;
}
