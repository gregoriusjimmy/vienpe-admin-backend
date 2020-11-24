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

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
})

// MEMBER CONTROLLER

app.post('/member', (req, res) => {
  member.handleMemberPost(req, res, pool)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
