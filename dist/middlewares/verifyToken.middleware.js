"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const app_errors_1 = require("../errors/app.errors");
class VerifyToken {
    static execute(req, res, next) {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            throw new app_errors_1.AppError('Access denied. No token provided.', 401);
        }
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                throw new app_errors_1.AppError('Invalid token.', 401);
            }
            res.locals.decode = decoded;
            next();
        });
    }
}
exports.VerifyToken = VerifyToken;
