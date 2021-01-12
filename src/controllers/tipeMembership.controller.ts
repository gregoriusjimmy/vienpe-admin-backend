import { Request, Response } from 'express'
import { Pool } from 'pg'

export const handleTipeMembershipGet = (req: Request, res: Response, pool: Pool) => {
  pool.query('SELECT * FROM tipe_membership ORDER BY tipe', (error, results) => {
    if (error) {
      res.status(400).json(error.message)
    } else {
      res.status(200).json(results.rows)
    }
  })
}
export const handleTipeMembershipPost = (req: Request, res: Response, pool: Pool) => {
  const { tipe, keterangan } = req.body
  pool.query(
    'INSERT INTO tipe_membership (tipe,keterangan) VALUES ($1,$2) RETURNING tipe,keterangan',
    [tipe, keterangan],
    (error, results) => {
      if (error) {
        res.status(400).json(error.message)
      } else {
        res.status(200).json(results.rows[0])
      }
    }
  )
}
