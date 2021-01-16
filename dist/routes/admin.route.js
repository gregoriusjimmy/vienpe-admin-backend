"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const adminRoute = (pool) => {
    const router = express_1.Router();
    router.post('/login', (req, res) => admin_controller_1.handleAdminLoginPost(req, res, pool));
    return router;
};
exports.default = adminRoute;
