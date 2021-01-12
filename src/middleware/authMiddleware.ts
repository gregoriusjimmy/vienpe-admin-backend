import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt
  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_KEY!, (err: any, decodedToken: any) => {
      if (err) return res.status(400).json(err.message)
      else next()
    })
  } else return res.status(400).json('not verified')
}
