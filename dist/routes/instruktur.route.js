"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const instruktur_controller_1 = require("../controllers/instruktur.controller");
const instrukturRoute = (pool) => {
    const router = express_1.Router();
    router.get('/', (req, res) => instruktur_controller_1.handleInstrukturGet(req, res, pool));
    router.post('/', (req, res) => instruktur_controller_1.handleInstrukturPost(req, res, pool));
    router.put('/', (req, res) => instruktur_controller_1.handleInstrukturPut(req, res, pool));
    return router;
};
exports.default = instrukturRoute;
//# sourceMappingURL=instruktur.route.js.map