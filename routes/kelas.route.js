const express = require('express')

const kelasController = require('../controllers/kelas.controller')

const kelasRoute = (pool) => {
  const router = express.Router()

  router.get('/', (req, res) => kelasController.handleKelasGet(req, res, pool))
  router.post('/', (req, res) => kelasController.handleKelasPost(req, res, pool))
  router.put('/aktif',(req,res)=> kelasController.handleKelasAktifPut(req,res,pool))
  return router
}

module.exports = kelasRoute
