"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const membership_controller_1 = require("../controllers/membership.controller");
const membershipRoute = (pool) => {
    const router = express_1.Router();
    router.get('/', (req, res) => membership_controller_1.handleMembershipGet(req, res, pool));
    router.post('/', (req, res) => membership_controller_1.handleMembershipPost(req, res, pool));
    router.put('/', (req, res) => membership_controller_1.handleMembershipPut(req, res, pool));
    return router;
};
exports.default = membershipRoute;
