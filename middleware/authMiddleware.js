const jwt = require('jsonwebtoken')

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
      if (err) return res.status(400).json(err.message)
      else next()
    })
  } else return res.status(400).json('not verified')
}

module.exports = { requireAuth }
