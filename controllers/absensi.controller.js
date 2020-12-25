const handleAbsensiGet = (req, res, pool) => {
  pool.query('SELECT * FROM absensi', (error, results) => {
    if (error) {
      console.log(error)
      res.status(400).json(error.message)
    } else {
      res.status(200).json(results.rows)
    }
  })
}
const handleAbsensiGetJoined = (req, res, pool) => {
  pool.query(
    `SELECT member.nama, absensi.tgl_absensi,kelas.hari, 
   kelas.jam, kelas.kategori_senam, instruktur.nama member.status_mebership,absensi.use_membership 
   FROM absensi 
   INNER JOIN member on absensi.id_member = member.id
   INNER JOIN kelas on absensi.id_kelas = kelas.id
   INNER JOIN instruktur on kelas.id_instruktur = instruktur.id`,
    (error, results) => {
      if (error) {
        console.log(error)
        res.status(400).json(error.message)
      } else {
        res.status(200).json(results.rows)
      }
    }
  )
}
const handleAbsensiPost = (req, res, pool) => {
  const { id_member, tgl_absensi, id_kelas, use_membership } = req.body
  pool.query(
    'INSERT INTO absensi (id_member,tgl_absensi,id_kelas,use_membership) VALUES ($1,$2,$3,$4)',
    [id_member, tgl_absensi, id_kelas, use_membership],
    (error, results) => {
      if (error) {
        console.log(error)
        res.status(400).json(error.message)
      } else {
        res.status(200).json('success')
      }
    }
  )
}

module.exports = {
  handleAbsensiGet: handleAbsensiGet,
  handleAbsensiPost: handleAbsensiPost,
  handleAbsensiGetJoined: handleAbsensiGetJoined,
}
