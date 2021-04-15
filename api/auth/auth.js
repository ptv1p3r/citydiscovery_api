const config = require('config');
const jwt = require('jsonwebtoken');
const fs = require("fs");
const TOKEN_EXPIRE_SECONDS = Math.floor(config.get('token.expire_minutes') * 60); // converts minutes to seconds
const jwtSignOptions = {
    issuer: config.get('token.issuer'),
    subject: config.get('token.subject'),
    audience: config.get('token.audience'),
    expiresIn: TOKEN_EXPIRE_SECONDS,
    algorithm:  process.env.TOKEN_ALGORITHM
};
const jwtVerifyOptions = {
    issuer: config.get('token.issuer'),
    subject: config.get('token.subject'),
    audience: config.get('token.audience'),
    expiresIn: TOKEN_EXPIRE_SECONDS,
    algorithm:  [process.env.TOKEN_ALGORITHM]
}

async function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    const access_token = req.body.cookies.access_token || null;
    const refresh_token = req.body.cookies.refresh_token || null;

    const publicKey = fs.readFileSync('./api/auth/public.pem', 'utf8'); // 'utf8' to get string instead of byte array

    // check for missing token on headers
    if(!token) return res.status(404).json({
        ok: false,
        auth: false,
        message: 'No token provided in header: x-access-token'
    });

    await jwt.verify(token, publicKey, jwtVerifyOptions,async (err, decoded) =>{
       if(err) return res.status(400).json({
           ok: false,
           auth: false,
           message: 'Failed to authenticate token.'
       });

       // all ok, save on request for next usage
        req.userId = decoded.id;
        next();
    });

}

async function createJWT(payload, tokenType){
    let token = '';

    if (tokenType === undefined){
        // creates access token type
        const privateKey = fs.readFileSync('./api/auth/private.pem', 'utf8'); // 'utf8' to get string instead of byte array

        token = await jwt.sign(payload, {key: privateKey, passphrase: process.env.TOKEN_PASSPHRASE}, jwtSignOptions);
    } else {
        // creates refresh token
        token = await jwt.sign(payload, process.env.TOKEN_SECRET, {
            expiresIn: config.get('token.refresh_expire_minutes') * 60
        });
    }

    return token;
}

module.exports = {
    verifyJWT,
    createJWT
}
