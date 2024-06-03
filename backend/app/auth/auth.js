function authenticate(req, res, next) {
  if(req.cookies && req.cookies.user_id) {
    req.user = {id: req.cookies.user_id};
    next();
  } else {
    res.status(401).json({error: 'Usuário não identificado!'})
  }
}

export default authenticate;