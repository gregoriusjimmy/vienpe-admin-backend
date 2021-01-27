"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAbsensiInstrukturPost = exports.handleAbsensInstrukturGet = void 0;
const handleAbsensInstrukturGet = (req, res, pool) => {
    pool.query('SELECT * FROM absensi_instruktur_view', (error, results) => {
        if (error) {
            console.error(error);
            res.status(400).json(error.message);
        }
        else {
            res.status(200).json(results.rows);
        }
    });
};
exports.handleAbsensInstrukturGet = handleAbsensInstrukturGet;
const handleAbsensiInstrukturPost = (req, res, pool) => __awaiter(void 0, void 0, void 0, function* () {
    const { id_instruktur, tgl_absensi, id_kelas } = req.body;
    const client = yield pool.connect();
    try {
        try {
            yield client.query('BEGIN');
            const queryTextInsertAbsensiInstruktur = 'INSERT INTO absensi_instruktur (id_instruktur,tgl_absensi,id_kelas) VALUES ($1,$2,$3) RETURNING id';
            const resInsertAbsensiInstruktur = yield client.query(queryTextInsertAbsensiInstruktur, [
                id_instruktur,
                tgl_absensi,
                id_kelas,
            ]);
            const resSelectAbsensiInstrukturView = yield client.query('SELECT * FROM absensi_instruktur_view WHERE id = $1', [resInsertAbsensiInstruktur.rows[0]['id']]);
            res.status(200).json(resSelectAbsensiInstrukturView.rows[0]);
            yield client.query('COMMIT');
        }
        catch (e) {
            yield client.query('ROLLBACK');
            res.status(400).json(e.message);
            throw e;
        }
        finally {
            client.release();
        }
    }
    catch (err) {
        console.error(err.stack);
    }
});
exports.handleAbsensiInstrukturPost = handleAbsensiInstrukturPost;
