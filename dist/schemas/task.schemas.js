"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TTaskReturn = exports.taskUpdateSchema = exports.taskCreateSchema = exports.taskSchema = void 0;
const zod_1 = require("zod");
const category_schemas_1 = require("./category.schemas");
exports.taskSchema = zod_1.z.object({
    id: zod_1.z.number().int().positive(),
    title: zod_1.z.string().max(255).min(1),
    content: zod_1.z.string().min(1),
    finished: zod_1.z.boolean().default(false),
    categoryId: zod_1.z.number().int().positive().nullish(),
});
exports.taskCreateSchema = exports.taskSchema.omit({ id: true });
exports.taskUpdateSchema = exports.taskCreateSchema.partial();
exports.TTaskReturn = exports.taskSchema.extend({ category: category_schemas_1.categorySchema.nullish() }).omit({ categoryId: true });
