"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const helmet_1 = __importDefault(require("helmet"));
require('dotenv').config();
// const { Pool, Client } = require('pg')
const pg_1 = __importDefault(require("pg"));
const { Pool, Client } = pg_1.default;
const app = express_1.default();
const port = 3001;
app.use(helmet_1.default());
app.use(cookie_parser_1.default());
app.use(body_parser_1.default.json());
app.use(cors_1.default({ credentials: true, origin: 'http://localhost:3000' }));
app.use(body_parser_1.default.urlencoded({ extended: true }));
// date and time parser
const moment_1 = __importDefault(require("moment"));
const parseDate = (val) => {
    return val === null ? null : moment_1.default(val).format('DD-MM-YYYY');
};
const parseTime = (val) => {
    return val === null ? null : moment_1.default(val, 'HH:mm:ss').format('HH:mm');
};
const types = pg_1.default.types;
const DATATYPE_DATE = 1082;
const DATATYPE_TIME = 1083;
types.setTypeParser(DATATYPE_DATE, (val) => {
    return val === null ? null : parseDate(val);
});
types.setTypeParser(DATATYPE_TIME, (val) => {
    return val === null ? null : parseTime(val);
});
const member_route_1 = __importDefault(require("./routes/member.route"));
const instruktur_route_1 = __importDefault(require("./routes/instruktur.route"));
const membership_route_1 = __importDefault(require("./routes/membership.route"));
const tipeMembership_route_1 = __importDefault(require("./routes/tipeMembership.route"));
const admin_route_1 = __importDefault(require("./routes/admin.route"));
const kelas_route_1 = __importDefault(require("./routes/kelas.route"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const absensi_route_1 = __importDefault(require("./routes/absensi.route"));
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: 5432,
});
// MEMBER
app.use('/member', authMiddleware_1.requireAuth, member_route_1.default(pool));
// INSTRUKTUR
app.use('/instruktur', authMiddleware_1.requireAuth, instruktur_route_1.default(pool));
// TIPEMEMBERSHIP
app.use('/tipe-membership', authMiddleware_1.requireAuth, tipeMembership_route_1.default(pool));
// MEMBERSHIP
app.use('/membership', authMiddleware_1.requireAuth, membership_route_1.default(pool));
// INSTRUKTUR
app.use('/instruktur', authMiddleware_1.requireAuth, instruktur_route_1.default(pool));
// KELAS
app.use('/kelas', authMiddleware_1.requireAuth, kelas_route_1.default(pool));
// ADMIN
app.use('/admin', admin_route_1.default(pool));
// ABSENSI
app.use('/absensi', authMiddleware_1.requireAuth, absensi_route_1.default(pool));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
//# sourceMappingURL=server.js.map