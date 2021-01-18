import { Request, Response } from 'express'
import { Pool } from 'pg'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const saltRounds = 9

export const handleCreateAdmin = (req: Request, res: Response, pool: Pool) => {
  const admin = { username: 'admin', password: 'jimmy' }
  bcrypt.hash(admin.password, saltRounds, function (err: any, hash: any) {
    if (err) console.log(err)
    if (hash) {
      pool.query(
        'INSERT INTO admin (username,password) VALUES ($1,$2)',
        [admin.username, hash],
        (error, results) => {
          if (error) throw Error
        }
      )
    }
  })
}

const MAX_AGE = 3 * 60 * 60

const createToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY!, { expiresIn: MAX_AGE * 1000 })
}

export const handleAdminLoginPost = (req: Request, res: Response, pool: Pool) => {
  const { username, password } = req.body
  pool.query('SELECT * FROM admin WHERE username = ($1)', [username], (error, results) => {
    if (error) {
      res.status(400).json(error.message)
    } else {
      if (results.rowCount === 0) return res.status(400).json('username tidak ditemukan')
      const hashedPassword = results.rows[0]['password']
      bcrypt.compare(password, hashedPassword, function (err: { message: any }, result: boolean) {
        if (err) res.status(400).json(err.message)
        if (result === true) {
          const token = createToken(username)
          res.cookie('jwt', token, { httpOnly: true, maxAge: MAX_AGE * 1000 })
          res.status(200).json({ token: token })
        } else {
          res.status(400).json('username atau email salah')
        }
      })
    }
  })
}
