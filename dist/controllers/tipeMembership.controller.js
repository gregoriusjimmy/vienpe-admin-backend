"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleTipeMembershipPost = exports.handleTipeMembershipGet = void 0;
const handleTipeMembershipGet = (req, res, pool) => {
    pool.query('SELECT * FROM tipe_membership ORDER BY tipe', (error, results) => {
        if (error) {
            res.status(400).json(error.message);
        }
        else {
            res.status(200).json(results.rows);
        }
    });
};
exports.handleTipeMembershipGet = handleTipeMembershipGet;
const handleTipeMembershipPost = (req, res, pool) => {
    const { tipe, keterangan } = req.body;
    pool.query('INSERT INTO tipe_membership (tipe,keterangan) VALUES ($1,$2) RETURNING tipe,keterangan', [tipe, keterangan], (error, results) => {
        if (error) {
            res.status(400).json(error.message);
        }
        else {
            res.status(200).json(results.rows[0]);
        }
    });
};
exports.handleTipeMembershipPost = handleTipeMembershipPost;
//# sourceMappingURL=tipeMembership.controller.js.map