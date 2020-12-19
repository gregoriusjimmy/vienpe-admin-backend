const handleInstrukturPost = (req, res, pool) => {
  const { nama, no_telp, email, tgl_lahir } = req.body
  pool.query(
    'INSERT INTO instruktur (nama,no_telp,email,tgl_lahir) VALUES ($1,$2,$3,$4)',
    [nama, no_telp, email, tgl_lahir],
    (error, results) => {
      if (error) {
        res.status(400).json(error.message)
      } else {
        res.status(200).json('success')
      }
    }
  )
}

module.exports = {
  handleInstrukturPost: handleInstrukturPost,
}
