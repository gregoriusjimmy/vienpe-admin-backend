const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

// const { Pool, Client } = require('pg')
const pg = require('pg')
const { Pool, Client } = pg

const app = express()
const port = 3001

app.use(cookieParser())
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

// date parser
const moment = require('moment')
const parseDate = (val) => {
  return val === null ? null : moment(val).format('YYYY-MM-DD')
}
const types = pg.types
const DATATYPE_DATE = 1082
types.setTypeParser(DATATYPE_DATE, (val) => {
  return val === null ? null : parseDate(val)
})

const memberRoute = require('./routes/member.route')
const instrukturRoute = require('./routes/instruktur.route')
const membershipRoute = require('./routes/membership.route')
const tipeMembershipRoute = require('./routes/tipeMembership.route')

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
})

// MEMBER
app.use('/member', memberRoute(pool))
// INSTRUKTUR
app.use('/instruktur', instrukturRoute(pool))
// TIPEMEMBERSHIP
app.use('/tipe-membership', tipeMembershipRoute(pool))
// MEMBERSHIP
app.use('/membership', membershipRoute(pool))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
