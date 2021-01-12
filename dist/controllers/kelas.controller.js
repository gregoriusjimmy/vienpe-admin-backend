"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleKelasAktifPut = exports.handleKelasPost = exports.handleKelasGet = void 0;
const handleKelasGet = (req, res, pool) => {
    pool.query('SELECT id,id_instruktur,kategori_senam,hari,jam,aktif,created_at FROM kelas', (error, results) => {
        if (error) {
            res.status(400).json(error.message);
        }
        else {
            res.status(200).json(results.rows);
        }
    });
};
exports.handleKelasGet = handleKelasGet;
const handleKelasPost = (req, res, pool) => {
    const { id_instruktur, kategori_senam, hari, jam } = req.body;
    pool.query(`INSERT INTO KELAS (id_instruktur,kategori_senam,hari,jam) VALUES ($1,$2,$3,$4)
    RETURNING id,id_instruktur,kategori_senam,hari,jam,aktif,created_at`, [id_instruktur, kategori_senam, hari, jam], (error, results) => {
        if (error) {
            console.error(error);
            res.status(400).json(error.message);
        }
        else {
            res.status(200).json(results.rows[0]);
        }
    });
};
exports.handleKelasPost = handleKelasPost;
const handleKelasAktifPut = (req, res, pool) => {
    const { id, aktif } = req.body;
    pool.query('UPDATE kelas SET aktif=$2 WHERE id=$1 RETURNING id,id_instruktur,kategori_senam,hari,jam,aktif,created_at', [id, aktif], (error, results) => {
        if (error) {
            console.error(error);
            res.status(400).json(error.message);
        }
        else {
            res.status(200).json(results.rows[0]);
        }
    });
};
exports.handleKelasAktifPut = handleKelasAktifPut;
//# sourceMappingURL=kelas.controller.js.map