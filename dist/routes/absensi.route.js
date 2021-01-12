"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const absensiInstruktur_1 = require("../controllers/absensiInstruktur");
const absensiMember_controller_1 = require("../controllers/absensiMember.controller");
const absensiRoute = (pool) => {
    const router = express_1.Router();
    router.get('/member', (req, res) => absensiMember_controller_1.handleAbsensiMemberGet(req, res, pool));
    router.post('/member', (req, res) => absensiMember_controller_1.handleAbsensiMemberPost(req, res, pool));
    router.get('/instruktur', (req, res) => absensiInstruktur_1.handleAbsensInstrukturGet(req, res, pool));
    router.post('/instruktur', (req, res) => absensiInstruktur_1.handleAbsensiInstrukturPost(req, res, pool));
    return router;
};
exports.default = absensiRoute;
//# sourceMappingURL=absensi.route.js.map