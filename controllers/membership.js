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
    'INSERT INTO membership (id_member,tipe_membership,tgl_mulai,tgl_selesai,sisa_point) VALUES ($1,$2,$3,$4,$5)',
    [id_member, tipe_membership, tgl_mulai, tgl_selesai, sisa_point],
    (error, results) => {
      if (error) {
        console.log(id_member)
        console.log(error)
        res.status(400).json(error.message)
      } else {
        res.status(200).json('success')
      }
    }
  )
}

module.exports = {
  handleMembershipGet: handleMembershipGet,
  handleMembershipPost: handleMembershipPost,
}
