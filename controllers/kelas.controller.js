const handleKelasGet = (req, res, pool) => {
  pool.query(
    'SELECT id,id_instruktur,kategori_senam,hari,jam,aktif,created_at FROM kelas',
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
  const { id_instruktur, kategori_senam, hari, jam } = req.body
  pool.query(
    `INSERT INTO KELAS (id_instruktur,kategori_senam,hari,jam) VALUES ($1,$2,$3,$4)
    RETURNING id,id_instruktur,kategori_senam,hari,jam,aktif,created_at`,
    [id_instruktur, kategori_senam, hari, jam],
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
const handleMemberPut = (req, res, pool) => {
  const { id, nama, no_telp, email, tgl_lahir, status_membership } = req.body
  pool.query(
    'UPDATE member SET nama=$2,no_telp=$3,email=$4,tgl_lahir=$5,status_membership=$6 WHERE id=$1',
    [id, nama, no_telp, email, tgl_lahir, status_membership],
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
