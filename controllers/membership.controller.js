const handleMembershipGet = (req, res, pool) => {
  pool.query('SELECT * FROM membership', (error, results) => {
    if (error) {
      console.log(error)
      res.status(400).json(error.message)
    } else {
      res.status(200).json(results.rows)
    }
  })
}

const handleMembershipPost = (req, res, pool) => {
  const { id_member, tipe_membership, tgl_mulai, tgl_selesai, sisa_point } = req.body
  pool.query(
    'SELECT * FROM membership WHERE id_member = $1 AND tipe_membership = $2',
    [id_member, tipe_membership],
    (error, results) => {
      if (error) {
        console.log(error)
        return res.status(400).json(error.message)
      }
      if (results.rowCount > 0) return res.status(400).json('membership sudah pernah dibuat')
      else {
        pool.query(
          `INSERT INTO membership (id_member,tipe_membership,tgl_mulai,tgl_selesai,sisa_point) VALUES ($1,$2,$3,$4,$5) 
          RETURNING id,id_member,tipe_membership,tgl_mulai,tgl_selesai,sisa_point`,
          [id_member, tipe_membership, tgl_mulai, tgl_selesai, sisa_point],
          (error, results) => {
            if (error) {
              console.log(error)
              res.status(400).json(error.message)
            } else {
              res.status(200).json(results.rows[0])
            }
          }
        )
      }
    }
  )
}

module.exports = {
  handleMembershipGet: handleMembershipGet,
  handleMembershipPost: handleMembershipPost,
}
