const handleMembershipGet = (req, res, pool) => {
  pool.query('SELECT * FROM membership', (error, results) => {
    if (error) {
      console.error(error)
      res.status(400).json(error.message)
    } else {
      res.status(200).json(results.rows)
    }
  })
}

const handleMembershipPost = (req, res, pool) => {
  const { membership, member } = req.body
  const { id_member, tipe_membership, tgl_mulai, tgl_selesai, sisa_point } = membership
  pool.query(
    'SELECT * FROM membership WHERE id_member = $1 AND tipe_membership = $2',
    [membership.id_member, membership.tipe_membership],
    async (error, results) => {
      if (error) {
        console.error(error)
        return res.status(400).json(error.message)
      }
      if (results.rowCount > 0) return res.status(400).json('membership sudah pernah dibuat')
      else {
        const client = await pool.connect()
        try {
          try {
            await client.query('BEGIN')
            const queryTextUpdateMember =
              'UPDATE member SET status_membership = $2 WHERE id = $1 RETURNING *'
            const resUpdateMember = await client.query(queryTextUpdateMember, [
              member.id,
              member.status_membership,
            ])

            const queryTextInsertMembership =
              'INSERT INTO membership (id_member,tipe_membership,tgl_mulai,tgl_selesai,sisa_point) VALUES ($1,$2,$3,$4,$5) RETURNING *'

            const valuesInsertMembership = [
              id_member,
              tipe_membership,
              tgl_mulai,
              tgl_selesai,
              sisa_point,
            ]

            const resInsertMembership = await client.query(
              queryTextInsertMembership,
              valuesInsertMembership
            )
            res
              .status(200)
              .json({ membership: resInsertMembership.rows[0], member: resUpdateMember.rows[0] })
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
    }
  )
}

const handleMembershipPut = async (req, res, pool) => {
  const { membership, member } = req.body
  const { id, tgl_mulai, tgl_selesai, sisa_point } = membership
  const client = await pool.connect()
  try {
    try {
      await client.query('BEGIN')
      const queryTextUpdateMember =
        'UPDATE member SET status_membership = $2 WHERE id = $1 RETURNING *'
      const resUpdateMember = await client.query(queryTextUpdateMember, [
        member.id,
        member.status_membership,
      ])
      const queryTextUpdateMembership =
        'UPDATE membership SET tgl_mulai=$2,tgl_selesai=$3,sisa_point=$4 WHERE id=$1 RETURNING *'

      const valuesUpdateMembership = [id, tgl_mulai, tgl_selesai, sisa_point]

      const resUpdatetMembership = await client.query(
        queryTextUpdateMembership,
        valuesUpdateMembership
      )

      res
        .status(200)
        .json({ membership: resUpdatetMembership.rows[0], member: resUpdateMember.rows[0] })
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
  handleMembershipGet: handleMembershipGet,
  handleMembershipPost: handleMembershipPost,
  handleMembershipPut: handleMembershipPut,
}
