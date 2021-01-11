const handleAbsensInstrukturGet = (req, res, pool) => {
  pool.query('SELECT * FROM absensi_instruktur_view', (error, results) => {
    if (error) {
      console.error(error)
      res.status(400).json(error.message)
    } else {
      res.status(200).json(results.rows)
    }
  })
}
// const handleAbsensiInstrukturGetJoined = (req, res, pool) => {
//   pool.query(
//     `SELECT instruktur.nama, absensi_instruktur.tgl_absensi, kelas.hari,
//    kelas.jam, kelas.kategori_senam
//    FROM absensi_instruktur
//    INNER JOIN instruktur on absensi_instruktur.id_instruktur = instruktur.id
//    INNER JOIN kelas on absensi_instruktur.id_kelas = kelas.id`,
//     (error, results) => {
//       if (error) {
//         console.error(error)
//         res.status(400).json(error.message)
//       } else {
//         res.status(200).json(results.rows)
//       }
//     }
//   )
// }
const handleAbsensiInstrukturPost = async (req, res, pool) => {
  const { id_instruktur, tgl_absensi, id_kelas } = req.body
  const client = await pool.connect()
  try {
    try {
      await client.query('BEGIN')

      queryTextInsertAbsensiInstruktur =
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

module.exports = {
  handleAbsensInstrukturGet: handleAbsensInstrukturGet,
  handleAbsensiInstrukturPost: handleAbsensiInstrukturPost,
}
