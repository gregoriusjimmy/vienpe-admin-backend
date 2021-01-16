"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const member_controller_1 = require("../controllers/member.controller");
const memberRoute = (pool) => {
    const router = express_1.Router();
    router.get('/', (req, res) => member_controller_1.handleMemberGet(req, res, pool));
    router.post('/', (req, res) => member_controller_1.handleMemberPost(req, res, pool));
    router.put('/', (req, res) => member_controller_1.handleMemberPut(req, res, pool));
    return router;
};
exports.default = memberRoute;
