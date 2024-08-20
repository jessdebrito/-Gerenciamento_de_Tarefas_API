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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskServices = void 0;
const prisma_1 = require("../database/prisma");
const zod_1 = require("zod");
const app_errors_1 = require("../errors/app.errors");
const task_schemas_1 = require("../schemas/task.schemas");
const tsyringe_1 = require("tsyringe");
let TaskServices = class TaskServices {
    create(userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            if (body.categoryId) {
                const categoryExists = yield prisma_1.prisma.category.findFirst({
                    where: { id: body.categoryId }
                });
                if (!categoryExists) {
                    throw new app_errors_1.AppError("Category not found", 404);
                }
            }
            const data = yield prisma_1.prisma.task.create({
                data: Object.assign(Object.assign({}, body), { userId })
            });
            return task_schemas_1.TTaskReturn.extend({ categoryId: zod_1.z.number().nullish() }).parse(data);
        });
    }
    findMany(categoryName) {
        return __awaiter(this, void 0, void 0, function* () {
            if (categoryName) {
                const data = yield prisma_1.prisma.task.findMany({
                    include: { category: true },
                    where: { category: { name: { contains: categoryName, mode: "insensitive" } } }
                });
                return task_schemas_1.TTaskReturn.array().parse(data);
            }
            const data = yield prisma_1.prisma.task.findMany({
                include: { category: true }
            });
            return task_schemas_1.TTaskReturn.array().parse(data);
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield prisma_1.prisma.task.findFirst({
                where: { id },
                include: { category: true }
            });
            if (!data) {
                throw new app_errors_1.AppError("Task not found", 404);
            }
            return task_schemas_1.TTaskReturn.parse(data);
        });
    }
    update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield prisma_1.prisma.task.update({
                where: { id },
                data: body
            });
            return task_schemas_1.TTaskReturn.extend({ categoryId: zod_1.z.number().nullish() }).parse(data);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield prisma_1.prisma.task.delete({
                where: { id }
            });
        });
    }
};
exports.TaskServices = TaskServices;
exports.TaskServices = TaskServices = __decorate([
    (0, tsyringe_1.injectable)()
], TaskServices);
