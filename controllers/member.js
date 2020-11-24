const handleMemberPost = (req, res, pool) => {
  const { nama, no_telp, email, tgl_lahir } = req.body
  pool.query(
    'INSERT INTO member (nama,no_telp,email,tgl_lahir) VALUES ($1,$2,$3,$4)',
    [nama, no_telp, email, tgl_lahir],
    (error, results) => {
      if (error) {
        console.log(error)
        res.status(400).json('unable to fetch')
      } else {
        res.status(200).json('success')
      }
    }
  )
}

module.exports = {
  handleMemberPost: handleMemberPost,
}
