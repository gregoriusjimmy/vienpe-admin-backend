"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleInstrukturPut = exports.handleInstrukturPost = exports.handleInstrukturGet = void 0;
const handleInstrukturGet = (req, res, pool) => {
    pool.query('SELECT id,nama,no_telp,email,tgl_lahir FROM instruktur', (error, results) => {
        if (error) {
            console.error(error);
            res.status(400).json(error.message);
        }
        else {
            res.status(200).json(results.rows);
        }
    });
};
exports.handleInstrukturGet = handleInstrukturGet;
const handleInstrukturPost = (req, res, pool) => {
    const { nama, no_telp, email, tgl_lahir } = req.body;
    pool.query(`INSERT INTO instruktur (nama,no_telp,email,tgl_lahir) VALUES ($1,$2,$3,$4)
    RETURNING id,nama,no_telp,email,tgl_lahir`, [nama, no_telp, email, tgl_lahir], (error, results) => {
        if (error) {
            console.error(error);
            res.status(400).json(error.message);
        }
        else {
            res.status(200).json(results.rows[0]);
        }
    });
};
exports.handleInstrukturPost = handleInstrukturPost;
const handleInstrukturPut = (req, res, pool) => {
    const { id, nama, no_telp, email, tgl_lahir } = req.body;
    pool.query(`UPDATE instruktur SET nama=$2,no_telp=$3,email=$4,tgl_lahir=$5 WHERE id=$1
    RETURNING id,nama,no_telp,email,tgl_lahir`, [id, nama, no_telp, email, tgl_lahir], (error, results) => {
        if (error) {
            console.error(error);
            res.status(400).json(error.message);
        }
        else {
            res.status(200).json(results.rows[0]);
        }
    });
};
exports.handleInstrukturPut = handleInstrukturPut;
