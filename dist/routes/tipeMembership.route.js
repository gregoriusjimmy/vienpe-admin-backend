"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipeMembership_controller_1 = require("../controllers/tipeMembership.controller");
const tipeMembershipRoute = (pool) => {
    const router = express_1.Router();
    router.get('/', (req, res) => tipeMembership_controller_1.handleTipeMembershipGet(req, res, pool));
    router.post('/', (req, res) => tipeMembership_controller_1.handleTipeMembershipPost(req, res, pool));
    return router;
};
exports.default = tipeMembershipRoute;
//# sourceMappingURL=tipeMembership.route.js.map