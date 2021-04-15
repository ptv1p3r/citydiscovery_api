const config = require('config');
const auth = require('../auth/auth');
const redisClient = require('../../config/redis')();

module.exports = app => {
    const usersDB = app.data.users; // temporary data for db simulation
    const controller = {};
    const TOKEN_EXPIRE_SECONDS = Math.floor(config.get('token.expire_minutes') * 60); // converts minutes to seconds

    // user login
    controller.userLogin = async (req, res, next) => {
        // simulate db operations
        let refresh;
        if (req.body.user === 'pedro' && req.body.password === '123') {
            // auth ok
            const id = 1;
            const payload = {id};

            // create new access token
            const token = await auth.createJWT(payload);
            // create new refresh token
            const tokenRefresh = await auth.createJWT(payload, refresh = true);

            // Set browser httpOnly cookies
            res.cookie("access_token", token, {
                // secure: true,
                httpOnly: true
            });
            res.cookie("refresh_token", tokenRefresh, {
                // secure: true,
                httpOnly: true
            });

            // And store the user in Redis under key 1
            redisClient.set(id, JSON.stringify({
                    refresh_token: tokenRefresh,
                    expires: config.get('token.refresh_expire_minutes')
                }),
                redisClient.print
            );


            return res.status(200).json({
                ok: true,
                auth: true,
                id: id,
                token: token,
                expire: TOKEN_EXPIRE_SECONDS
            });
        }

        res.status(401).json({
            message:'User credentials mismatch'
        });
    }

    // user logout
    controller.userLogout = (req, res, next) => {
        // Delete user refresh token from Redis
        redisClient.del(req.body.uid);

        // Remove httpOnly cookies from browser
        res.clearCookie("access_token");
        res.clearCookie("refresh_token");

        // simulate db operations
        res.status(200).json({
            ok: true,
            auth: false,
            token: null
        });
    }

    // return user list
    controller.usersList = (req, res, next) => {
        res.status(200).json(usersDB);
    }

    return controller;
}
