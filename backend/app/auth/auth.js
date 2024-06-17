import jwt from 'jsonwebtoken';

const secretKey = 'secret'

function authenticate(req, res, next) {
  const token = req.cookies.token;

  if(token) {
    jwt.verify(token, secretKey, (err, decoded) => {
      if(err) {
        return res.status(401).json({error: 'Token inválido!'})
      }
      req.user = decoded;
      next();
    })
  } else {
    res.status(401).json({error: 'Usuário não identificado!'})
  }

  // if(req.cookies && req.cookies.user_id) {
  //   req.user = {id: req.cookies.user_id};
  //   next();
  // } else {
  //   res.status(401).json({error: 'Usuário não identificado!'})
  // }
}

export default authenticate;