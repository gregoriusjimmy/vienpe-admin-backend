const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// const saltRounds = 999

// const fakeSignUp = () => {
//   const admin = { username: 'admin', password: 'jimmy' }

//   bcrypt.hash(admin.password, saltRounds, function (err, hash) {
//     if (hash) {
//       pool.query(
//         'INSERT INTO admin (username,password) VALUES ($1,$2)',
//         [admin.username, hash],
//         (error, results) => {
//           if (error) throw Error
//         }
//       )
//     }
//   })
// }
const MAX_AGE = 2 * 60 * 60

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: MAX_AGE * 1000 })
}

const handleAdminLoginPost = (req, res, pool) => {
  const { username, password } = req.body
  pool.query('SELECT * FROM admin WHERE username = ($1)', [username], (error, results) => {
    if (error) {
      res.status(400).json(error.message)
    } else {
      if (results.rowCount === 0) return res.status(400).json('username tidak ditemukan')
      const hashedPassword = results.rows[0]['password']
      bcrypt.compare(password, hashedPassword, function (err, result) {
        if (err) res.status(400).json(err.message)
        if (result === true) {
          const token = createToken(username)
          res.cookie('jwt', token, { httpOnly: true, maxAge: MAX_AGE * 1000 })
          res.status(200).json('login success')
        } else {
          res.status(400).json('salah')
        }
      })
    }
  })
}
// const handleMembershipPost = (req, res, pool) => {
//   const { tipe, keterangan } = req.body
//   pool.query(
//     'INSERT INTO tipe_membership (tipe,keterangan) VALUES ($1,$2)',
//     [tipe, keterangan],
//     (error, results) => {
//       if (error) {
//         res.status(400).json(error.message)
//       } else {
//         res.status(200).json('success')
//       }
//     }
//   )
// }

module.exports = {
  handleAdminLoginPost: handleAdminLoginPost,
}
