const express = require('express')

const instrukturController = require('../controllers/instruktur.controller')

const instrukturRoute = (pool) => {
  const router = express.Router()

  router.get('/', (req, res) => instrukturController.handleInstrukturGet(req, res, pool))
  router.post('/', (req, res) => instrukturController.handleInstrukturPost(req, res, pool))
  router.put('/', (req, res) => instrukturController.handleInstrukturPut(req, res, pool))

  return router
}

module.exports = instrukturRoute
