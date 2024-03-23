import jwt from 'jsonwebtoken';
import config from '#src/config/index.js';

const extractToken = (req) => {
  const auth = req.headers.authorization;
  if (!auth) {
    throw new Error('unauthorized');
  }
  const token = auth.split(' ')[1];
  return token;
}

const isAuth = (req, res, next) => {
  try {
    const token = extractToken(req);
    const decoded = jwt.verify(token, config.jwtSecret, { algorithm: config.jwtAlgorithm });
    req.uid = decoded.uid;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({status: 'fail', message: 'unauthorized'});
  }
}

export default isAuth;