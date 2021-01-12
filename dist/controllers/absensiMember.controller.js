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
exports.handleAbsensiMemberPost = exports.handleAbsensiMemberGet = void 0;
const handleAbsensiMemberGet = (req, res, pool) => {
    pool.query('SELECT * FROM absensi_member_view', (error, results) => {
        if (error) {
            console.error(error);
            res.status(400).json(error.message);
        }
        else {
            res.status(200).json(results.rows);
        }
    });
};
exports.handleAbsensiMemberGet = handleAbsensiMemberGet;
const handleAbsensiMemberPost = (req, res, pool) => __awaiter(void 0, void 0, void 0, function* () {
    const { absensiMember, useMembership } = req.body;
    const { id_member, tgl_absensi, id_kelas } = absensiMember;
    const client = yield pool.connect();
    try {
        try {
            yield client.query('BEGIN');
            let queryTextInsertAbsensiMember = 'INSERT INTO absensi_member (id_member,tgl_absensi,id_kelas) VALUES ($1,$2,$3) RETURNING *';
            let valuesInsertAbsensiMember = [id_member, tgl_absensi, id_kelas];
            if (req.body.absensiMember.id_membership && useMembership) {
                const { id_membership } = absensiMember;
                const resSelectMembership = yield client.query('SELECT sisa_point FROM membership WHERE id = $1', [id_membership]);
                const sisaPoint = resSelectMembership.rows[0]['sisa_point'];
                if (sisaPoint <= 0)
                    throw 'Sisa point kurang';
                const newSisaPoint = parseInt(sisaPoint) - 1;
                yield client.query('UPDATE membership SET sisa_point = $2 WHERE id = $1', [
                    id_membership,
                    newSisaPoint,
                ]);
                queryTextInsertAbsensiMember =
                    'INSERT INTO absensi_member (id_member,tgl_absensi,id_kelas,id_membership) VALUES ($1,$2,$3,$4)  RETURNING id';
                valuesInsertAbsensiMember.push(id_membership);
            }
            const resInsertAbsensiMember = yield client.query(queryTextInsertAbsensiMember, valuesInsertAbsensiMember);
            const resSelectAbsensiMemberView = yield client.query('SELECT * FROM absensi_member_view WHERE id = $1', [resInsertAbsensiMember.rows[0]['id']]);
            res.status(200).json(resSelectAbsensiMemberView.rows[0]);
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
exports.handleAbsensiMemberPost = handleAbsensiMemberPost;
//# sourceMappingURL=absensiMember.controller.js.map