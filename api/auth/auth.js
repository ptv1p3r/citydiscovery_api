const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];

    // check for missing token
    if(!token) return res.status(404).json({ok: false, auth: false, message: 'No token provided'});

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) =>{
       if(err) return res.status(400).json({ok: false, auth: false, message: 'Failed to authenticate token.'});

       // all ok, save on request for next usage
        req.userId = decoded.id;
        next();
    });
}

module.exports = {
    verifyJWT
}
