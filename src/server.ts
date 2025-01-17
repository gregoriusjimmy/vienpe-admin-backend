import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
require('dotenv').config()

import pg from 'pg'
const { Pool, Client } = pg

const app = express()
const port = 3001

// app.use(helmet())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(bodyParser.urlencoded({ extended: true }))

// date and time parser
import moment from 'moment'
const parseDate = (val: any) => {
  return val === null ? null : moment(val).format('DD-MM-YYYY')
}
const parseTime = (val: any) => {
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

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
})

import memberRoute from './routes/member.route'
import instrukturRoute from './routes/instruktur.route'
import membershipRoute from './routes/membership.route'
import tipeMembershipRoute from './routes/tipeMembership.route'
import adminRoute from './routes/admin.route'
import kelasRoute from './routes/kelas.route'
import { requireAuth } from './middleware/authMiddleware'
import absensiRoute from './routes/absensi.route'
import path from 'path'

// MEMBER
app.use('/api/member', requireAuth, memberRoute(pool))
// INSTRUKTUR
app.use('/api/instruktur', requireAuth, instrukturRoute(pool))
// TIPEMEMBERSHIP
app.use('/api/tipe-membership', requireAuth, tipeMembershipRoute(pool))
// MEMBERSHIP
app.use('/api/membership', requireAuth, membershipRoute(pool))
// INSTRUKTUR
app.use('/api/instruktur', requireAuth, instrukturRoute(pool))
// KELAS
app.use('/api/kelas', requireAuth, kelasRoute(pool))
// ADMIN
app.use('/api/admin', adminRoute(pool))
// ABSENSI
app.use('/api/absensi', requireAuth, absensiRoute(pool))

app.use(express.static(path.join(__dirname, '../client/build')))

app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'service-worker.js'))
})

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
