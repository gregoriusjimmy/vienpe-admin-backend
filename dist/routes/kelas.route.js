"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const kelas_controller_1 = require("../controllers/kelas.controller");
const kelasRoute = (pool) => {
    const router = express_1.Router();
    router.get('/', (req, res) => kelas_controller_1.handleKelasGet(req, res, pool));
    router.post('/', (req, res) => kelas_controller_1.handleKelasPost(req, res, pool));
    router.put('/aktif', (req, res) => kelas_controller_1.handleKelasAktifPut(req, res, pool));
    return router;
};
exports.default = kelasRoute;
//# sourceMappingURL=kelas.route.js.map