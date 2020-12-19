// const handleMembershipGet = (req, res, pool) => {
//   pool.query('SELECT * FROM membership', (error, results) => {
//     if (error) {
//       res.status(400).json(error.message)
//     } else {
//       res.status(200).json(results.rows)
//     }
//   })
// }
// const handleMembershipPost = (req, res, pool) => {
//   const { tipe, keterangan } = req.body
//   pool.query(
//     'INSERT INTO tipe_membership (tipe,keterangan) VALUES ($1,$2)',
//     [tipe, keterangan],
//     (error, results) => {
//       if (error) {
//         res.status(400).json(error.message)
//       } else {
//         res.status(200).json('success')
//       }
//     }
//   )
// }

// module.exports = {
//   handleMembershipGet: handleMembershipGet,
//   handleMembershipPost: handleMembershipPost,
// }
