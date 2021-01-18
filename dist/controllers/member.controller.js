"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMemberPut = exports.handleMemberPost = exports.handleMemberGet = void 0;
const handleMemberGet = (req, res, pool) => {
    pool.query('SELECT id,nama,no_telp,email,tgl_lahir,status_membership::text FROM member', (error, results) => {
        if (error) {
            console.error(error);
            res.status(400).json(error.message);
        }
        else {
            res.status(200).json(results.rows);
        }
    });
};
exports.handleMemberGet = handleMemberGet;
const handleMemberPost = (req, res, pool) => {
    const { nama, no_telp, email, tgl_lahir } = req.body;
    pool.query('INSERT INTO member (nama,no_telp,email,tgl_lahir) VALUES ($1,$2,$3,$4) RETURNING id,nama,no_telp,email,tgl_lahir,status_membership', [nama, no_telp, email, tgl_lahir], (error, results) => {
        if (error) {
            console.error(error);
            res.status(400).json(error.message);
        }
        else {
            res.status(200).json(results.rows[0]);
        }
    });
};
exports.handleMemberPost = handleMemberPost;
const handleMemberPut = (req, res, pool) => {
    const { id, nama, no_telp, email, tgl_lahir, status_membership } = req.body;
    pool.query('UPDATE member SET nama=$2,no_telp=$3,email=$4,tgl_lahir=$5,status_membership=$6 WHERE id=$1 RETURNING id,nama,no_telp,email,tgl_lahir,status_membership', [id, nama, no_telp, email, tgl_lahir, status_membership], (error, results) => {
        if (error) {
            console.error(error);
            res.status(400).json(error.message);
        }
        else {
            res.status(200).json(results.rows[0]);
        }
    });
};
exports.handleMemberPut = handleMemberPut;