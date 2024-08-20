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
const vitest_1 = require("vitest");
const prisma_1 = require("../../../database/prisma");
const setupFiles_1 = require("../../setupFiles");
(0, vitest_1.describe)("delete category", () => {
    (0, vitest_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield prisma_1.prisma.category.create({ data: { name: "Example" } });
    }));
    (0, vitest_1.it)("should be able to delete a category successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const category = yield prisma_1.prisma.category.findFirst();
        yield setupFiles_1.request.delete(`/categories/${category === null || category === void 0 ? void 0 : category.id}`).expect(204);
    }));
    (0, vitest_1.it)("should return an error when deleting a category with non existing id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield setupFiles_1.request.delete("/categories/99999");
        const expectedBody = {
            message: "Category not found",
        };
        (0, vitest_1.expect)(response.body).toEqual(expectedBody);
        (0, vitest_1.expect)(response.statusCode).toBe(404);
    }));
});
