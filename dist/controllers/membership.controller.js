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
exports.handleMembershipPut = exports.handleMembershipPost = exports.handleMembershipGet = void 0;
const handleMembershipGet = (req, res, pool) => {
    pool.query('SELECT * FROM membership', (error, results) => {
        if (error) {
            console.error(error);
            res.status(400).json(error.message);
        }
        else {
            res.status(200).json(results.rows);
        }
    });
};
exports.handleMembershipGet = handleMembershipGet;
const handleMembershipPost = (req, res, pool) => {
    const { membership, member } = req.body;
    const { id_member, tipe_membership, tgl_mulai, tgl_selesai, sisa_point } = membership;
    pool.query('SELECT * FROM membership WHERE id_member = $1 AND tipe_membership = $2', [membership.id_member, membership.tipe_membership], (error, results) => __awaiter(void 0, void 0, void 0, function* () {
        if (error) {
            console.error(error);
            return res.status(400).json(error.message);
        }
        if (results.rowCount > 0)
            return res.status(400).json('membership sudah pernah dibuat');
        else {
            const client = yield pool.connect();
            try {
                try {
                    yield client.query('BEGIN');
                    const queryTextUpdateMember = 'UPDATE member SET status_membership = $2 WHERE id = $1 RETURNING *';
                    const resUpdateMember = yield client.query(queryTextUpdateMember, [
                        member.id,
                        member.status_membership,
                    ]);
                    const queryTextInsertMembership = 'INSERT INTO membership (id_member,tipe_membership,tgl_mulai,tgl_selesai,sisa_point) VALUES ($1,$2,$3,$4,$5) RETURNING *';
                    const valuesInsertMembership = [
                        id_member,
                        tipe_membership,
                        tgl_mulai,
                        tgl_selesai,
                        sisa_point,
                    ];
                    const resInsertMembership = yield client.query(queryTextInsertMembership, valuesInsertMembership);
                    res
                        .status(200)
                        .json({ membership: resInsertMembership.rows[0], member: resUpdateMember.rows[0] });
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
        }
    }));
};
exports.handleMembershipPost = handleMembershipPost;
const handleMembershipPut = (req, res, pool) => __awaiter(void 0, void 0, void 0, function* () {
    const { membership, member } = req.body;
    const { id, tgl_mulai, tgl_selesai, sisa_point } = membership;
    const client = yield pool.connect();
    try {
        try {
            yield client.query('BEGIN');
            const queryTextUpdateMember = 'UPDATE member SET status_membership = $2 WHERE id = $1 RETURNING *';
            const resUpdateMember = yield client.query(queryTextUpdateMember, [
                member.id,
                member.status_membership,
            ]);
            const queryTextUpdateMembership = 'UPDATE membership SET tgl_mulai=$2,tgl_selesai=$3,sisa_point=$4 WHERE id=$1 RETURNING *';
            const valuesUpdateMembership = [id, tgl_mulai, tgl_selesai, sisa_point];
            const resUpdatetMembership = yield client.query(queryTextUpdateMembership, valuesUpdateMembership);
            res
                .status(200)
                .json({ membership: resUpdatetMembership.rows[0], member: resUpdateMember.rows[0] });
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
exports.handleMembershipPut = handleMembershipPut;
