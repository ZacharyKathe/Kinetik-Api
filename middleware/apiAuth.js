function apiAuth(req,res,next){
  if(!req.session.user){
      res.status(401)
      return
  } else {
      next();
  }
};

module.exports = apiAuth;