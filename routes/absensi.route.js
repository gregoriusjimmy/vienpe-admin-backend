const express = require('express')

const absensiController = require('../controllers/absensi.controller')

const absensiRoute = (pool) => {
  const router = express.Router()

  router.get('/', (req, res) => absensiController.handleAbsensiGet(req, res, pool))
  router.get('/joined', (req, res) => absensiController.handleAbsensiGetJoined(req, res, pool))
  router.post('/', (req, res) => absensiController.handleAbsensiPost(req, res, pool))

  return router
}

module.exports = absensiRoute
