import { Request, Response } from 'express'
import { Pool } from 'pg'

export const handleAbsensInstrukturGet = (req: Request, res: Response, pool: Pool) => {
  pool.query('SELECT * FROM absensi_instruktur_view', (error, results) => {
    if (error) {
      console.error(error)
      res.status(400).json(error.message)
    } else {
      res.status(200).json(results.rows)
    }
  })
}

export const handleAbsensiInstrukturPost = async (req: Request, res: Response, pool: Pool) => {
  const { id_instruktur, tgl_absensi, id_kelas } = req.body
  const client = await pool.connect()
  try {
    try {
      await client.query('BEGIN')

      const queryTextInsertAbsensiInstruktur =
        'INSERT INTO absensi_instruktur (id_instruktur,tgl_absensi,id_kelas) VALUES ($1,$2,$3) RETURNING id'
      const resInsertAbsensiInstruktur = await client.query(queryTextInsertAbsensiInstruktur, [
        id_instruktur,
        tgl_absensi,
        id_kelas,
      ])
      const resSelectAbsensiInstrukturView = await client.query(
        'SELECT * FROM absensi_instruktur_view WHERE id = $1',
        [resInsertAbsensiInstruktur.rows[0]['id']]
      )
      res.status(200).json(resSelectAbsensiInstrukturView.rows[0])
      await client.query('COMMIT')
    } catch (e) {
      await client.query('ROLLBACK')
      res.status(400).json(e.message)
      throw e
    } finally {
      client.release()
    }
  } catch (err) {
    console.error(err.stack)
  }
}
