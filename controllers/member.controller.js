const handleMemberGet = (req, res, pool) => {
  pool.query(
    'SELECT id,nama,no_telp,email,tgl_lahir,status_membership::text FROM member',
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

const handleMemberPost = (req, res, pool) => {
  const { nama, no_telp, email, tgl_lahir } = req.body
  pool.query(
    'INSERT INTO member (nama,no_telp,email,tgl_lahir) VALUES ($1,$2,$3,$4)',
    [nama, no_telp, email, tgl_lahir],
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
  handleMemberPost: handleMemberPost,
  handleMemberGet: handleMemberGet,
  handleMemberPut: handleMemberPut,
}
