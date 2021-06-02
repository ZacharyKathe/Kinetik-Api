const jwt = require('jsonwebtoken')

const tokenAuth = (req, res, next) => {
  
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    jwt.verify(
      token, 
      process.env.JWT_SECRET, 
      (err, data) => {
      if (err) {
        console.log(err);
        res.status(403).json({ message: 'auth failed' })
      } else {
        // If authorization succeeded
        console.log(data);
        req.user = data;
        return next();
      }
    })
  } else {
    res.status(403).json({ message: "authorization failed" })
  }

}

module.exports = tokenAuth;
