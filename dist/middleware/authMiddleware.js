"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    // check json web token exists & is verified
    if (token) {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY, (err, decodedToken) => {
            if (err)
                return res.status(400).json(err.message);
            else
                next();
        });
    }
    else
        return res.status(400).json('not verified');
};
exports.requireAuth = requireAuth;
