import jwt from 'jsonwebtoken';

const isAuth = (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
        res.status(401).send({ message: 'Token is not supplied' });
    } else {
        const token = bearerToken.slice(7, bearerToken.length);
        jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
            if (err) {
                res.status(401).send({ message: 'Invalid Token' });
            } else {
                req.user = data;
                next();
            }
        });
    }
};

export default isAuth;
