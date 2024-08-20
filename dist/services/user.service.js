"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = require("jsonwebtoken");
const prisma_1 = require("../database/prisma");
const app_errors_1 = require("../errors/app.errors");
const schemas_1 = require("../schemas");
const tsyringe_1 = require("tsyringe");
let UserServices = class UserServices {
    register(body) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("oi");
            const hashPassword = yield bcrypt_1.default.hash(body.password, 10);
            const newUser = {
                name: body.name,
                email: body.email,
                password: hashPassword,
            };
            const data = yield prisma_1.prisma.user.create({ data: newUser });
            const schemaReturn = schemas_1.userReturnSchema.parse(data);
            console.log(schemaReturn);
            console.log(data);
            return schemaReturn;
        });
    }
    login(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.prisma.user.findFirst({ where: { email: body.email } });
            if (!user) {
                throw new app_errors_1.AppError("User not registered", 404);
            }
            const compare = yield bcrypt_1.default.compare(body.password, user.password);
            if (!compare) {
                throw new app_errors_1.AppError("Email and password doesn't match.", 401);
            }
            const secret = process.env.JWT_SECRET;
            const token = (0, jsonwebtoken_1.sign)({ id: user.id }, secret, {
                expiresIn: "12h",
                subject: String(user.id),
            });
            return {
                accessToken: token,
                user: schemas_1.userReturnSchema.parse(user),
            };
        });
    }
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.prisma.user.findFirst({ where: { id } });
            if (!user) {
                throw new app_errors_1.AppError("User not found", 404);
            }
            return schemas_1.userReturnSchema.parse(user);
        });
    }
};
exports.UserServices = UserServices;
exports.UserServices = UserServices = __decorate([
    (0, tsyringe_1.injectable)()
], UserServices);
