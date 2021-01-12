import { Request, Response } from 'express'
import { Pool } from 'pg'
export const handleAbsensiMemberGet = (req: Request, res: Response, pool: Pool) => {
  pool.query('SELECT * FROM absensi_member_view', (error, results) => {
    if (error) {
      console.error(error)
      res.status(400).json(error.message)
    } else {
      res.status(200).json(results.rows)
    }
  })
}

export const handleAbsensiMemberPost = async (req: Request, res: Response, pool: Pool) => {
  const { absensiMember, useMembership } = req.body
  const { id_member, tgl_absensi, id_kelas } = absensiMember
  const client = await pool.connect()
  try {
    try {
      await client.query('BEGIN')
      let queryTextInsertAbsensiMember =
        'INSERT INTO absensi_member (id_member,tgl_absensi,id_kelas) VALUES ($1,$2,$3) RETURNING *'
      let valuesInsertAbsensiMember = [id_member, tgl_absensi, id_kelas]

      if (req.body.absensiMember.id_membership && useMembership) {
        const { id_membership } = absensiMember
        const resSelectMembership = await client.query(
          'SELECT sisa_point FROM membership WHERE id = $1',
          [id_membership]
        )
        const sisaPoint = resSelectMembership.rows[0]['sisa_point']
        if (sisaPoint <= 0) throw 'Sisa point kurang'
        const newSisaPoint = parseInt(sisaPoint) - 1
        await client.query('UPDATE membership SET sisa_point = $2 WHERE id = $1', [
          id_membership,
          newSisaPoint,
        ])
        queryTextInsertAbsensiMember =
          'INSERT INTO absensi_member (id_member,tgl_absensi,id_kelas,id_membership) VALUES ($1,$2,$3,$4)  RETURNING id'
        valuesInsertAbsensiMember.push(id_membership)
      }

      const resInsertAbsensiMember = await client.query(
        queryTextInsertAbsensiMember,
        valuesInsertAbsensiMember
      )
      const resSelectAbsensiMemberView = await client.query(
        'SELECT * FROM absensi_member_view WHERE id = $1',
        [resInsertAbsensiMember.rows[0]['id']]
      )
      res.status(200).json(resSelectAbsensiMemberView.rows[0])
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
