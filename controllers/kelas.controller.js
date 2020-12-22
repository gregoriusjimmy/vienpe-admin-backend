const handleKelasGet = (req, res, pool) => {
  pool.query(
    'SELECT id,id_instruktur,kategori_senam,hari,jam,keterangan,created_at FROM kelas',
    (error, results) => {
      if (error) {
        res.status(400).json(error.message)
      } else {
        res.status(200).json(results.rows)
      }
    }
  )
}

const handleKelasPost = (req, res, pool) => {
  const { id_instruktur, kategori_senam, hari, jam, keterangan } = req.body
  pool.query(
    'INSERT INTO KELAS (id_instruktur,kategori_senam,hari,jam,keterangan) VALUES ($1,$2,$3,$4,$5)',
    [id_instruktur, kategori_senam, hari, jam, keterangan],
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
  handleKelasGet: handleKelasGet,
  handleKelasPost: handleKelasPost,
}
