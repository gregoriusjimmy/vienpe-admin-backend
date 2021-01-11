const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
require('dotenv').config()

// const { Pool, Client } = require('pg')
const pg = require('pg')
const { Pool, Client } = pg

const app = express()
const port = 3001

// app.use(helmet())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(bodyParser.urlencoded({ extended: true }))

// date and time parser
const moment = require('moment')
const parseDate = (val) => {
  return val === null ? null : moment(val).format('DD-MM-YYYY')
}
const parseTime = (val) => {
  return val === null ? null : moment(val, 'HH:mm:ss').format('HH:mm')
}
const types = pg.types
const DATATYPE_DATE = 1082
const DATATYPE_TIME = 1083
types.setTypeParser(DATATYPE_DATE, (val) => {
  return val === null ? null : parseDate(val)
})
types.setTypeParser(DATATYPE_TIME, (val) => {
  return val === null ? null : parseTime(val)
})

const memberRoute = require('./routes/member.route')
const instrukturRoute = require('./routes/instruktur.route')
const membershipRoute = require('./routes/membership.route')
const tipeMembershipRoute = require('./routes/tipeMembership.route')
const adminRoute = require('./routes/admin.route')
const kelasRoute = require('./routes/kelas.route')
const { requireAuth } = require('./middleware/authMiddleware')
const absensiRoute = require('./routes/absensi.route')

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
})

// MEMBER
app.use('/member', requireAuth, memberRoute(pool))
// INSTRUKTUR
app.use('/instruktur', requireAuth, instrukturRoute(pool))
// TIPEMEMBERSHIP
app.use('/tipe-membership', requireAuth, tipeMembershipRoute(pool))
// MEMBERSHIP
app.use('/membership', requireAuth, membershipRoute(pool))
// INSTRUKTUR
app.use('/instruktur', requireAuth, instrukturRoute(pool))
// KELAS
app.use('/kelas', requireAuth, kelasRoute(pool))
// ADMIN
app.use('/admin', adminRoute(pool))
// ABSENSI
app.use('/absensi', requireAuth, absensiRoute(pool))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
