"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleAdminLoginPost = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
// const saltRounds = 999
// const fakeSignUp = () => {
//   const admin = { username: 'admin', password: 'jimmy' }
//   bcrypt.hash(admin.password, saltRounds, function (err, hash) {
//     if (hash) {
//       pool.query(
//         'INSERT INTO admin (username,password) VALUES ($1,$2)',
//         [admin.username, hash],
//         (error, results) => {
//           if (error) throw Error
//         }
//       )
//     }
//   })
// }
const MAX_AGE = 3 * 60 * 60;
const createToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: MAX_AGE * 1000 });
};
const handleAdminLoginPost = (req, res, pool) => {
    const { username, password } = req.body;
    pool.query('SELECT * FROM admin WHERE username = ($1)', [username], (error, results) => {
        if (error) {
            res.status(400).json(error.message);
        }
        else {
            if (results.rowCount === 0)
                return res.status(400).json('username tidak ditemukan');
            const hashedPassword = results.rows[0]['password'];
            bcrypt_1.default.compare(password, hashedPassword, function (err, result) {
                if (err)
                    res.status(400).json(err.message);
                if (result === true) {
                    const token = createToken(username);
                    res.cookie('jwt', token, { httpOnly: true, maxAge: MAX_AGE * 1000 });
                    res.status(200).json({ token: token });
                }
                else {
                    res.status(400).json('username atau email salah');
                }
            });
        }
    });
};
exports.handleAdminLoginPost = handleAdminLoginPost;
//# sourceMappingURL=admin.controller.js.map