const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
// const bodyParser = require('body-parser');

const { Pool, Client } = require('pg')

const app = express()
const port = 3001
// app.use(express.json()) //Used to parse JSON bodies
app.use(bodyParser.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))

const member = require('./controllers/member')
const instruktur = require('./controllers/instruktur')
const membership = require('./controllers/membership')
const tipeMembership = require('./controllers/tipeMembership')

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
})

// MEMBER CONTROLLER
app.get('/member', (req, res) => {
  member.handleMemberGet(req, res, pool)
})
app.post('/member', (req, res) => {
  member.handleMemberPost(req, res, pool)
})
// INSTRUKTUR CONTROLLER
app.post('/instruktur', (req, res) => {
  instruktur.handleInstrukturPost(req, res, pool)
})
// TIPEMEMBERSHIP CONTROLLER
app.get('/tipe-membership', (req, res) => {
  tipeMembership.handleTipeMembershipGet(req, res, pool)
})
app.post('/tipe-membership', (req, res) => {
  tipeMembership.handleTipeMembershipPost(req, res, pool)
})
// MEMBERSHIP CONTROLLER
app.get('/membership', (req, res) => {
  membership.handleMembershipGet(req, res, pool)
})
app.post('/membership', (req, res) => {
  membership.handleMembershipPost(req, res, pool)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
