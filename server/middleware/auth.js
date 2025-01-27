const jwt = require("jsonwebtoken");

const auth  = (req, res, next) => {
    const token = req.header('Authorization');

    if(!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'Invalid Token' });
    }
}

module.exports = auth;