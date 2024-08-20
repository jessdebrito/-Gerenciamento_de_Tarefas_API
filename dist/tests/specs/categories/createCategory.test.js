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
const setupFiles_1 = require("../../setupFiles");
(0, vitest_1.describe)("create category", () => __awaiter(void 0, void 0, void 0, function* () {
    (0, vitest_1.it)("should be able to create category successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const category = {
            name: "Example",
        };
        const response = yield setupFiles_1.request.post("/categories").send(category);
        const expectedBody = {
            id: vitest_1.expect.any(Number),
            name: category.name,
        };
        (0, vitest_1.expect)(response.body).toEqual(expectedBody);
        (0, vitest_1.expect)(response.statusCode).toBe(201);
    }));
    (0, vitest_1.it)("should return an error when creating a category with empty body", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield setupFiles_1.request.post("/categories").send({});
        const expectedBody = {
            errors: [
                {
                    code: "invalid_type",
                    expected: "string",
                    received: "undefined",
                    path: ["name"],
                    message: "Required",
                },
            ],
        };
        (0, vitest_1.expect)(response.body).toEqual(expectedBody);
        (0, vitest_1.expect)(response.statusCode).toBe(400);
    }));
    (0, vitest_1.it)("should return an error when creating a category with invalid name type", () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidDataCategory = {
            name: 123,
        };
        const response = yield setupFiles_1.request
            .post("/categories")
            .send(invalidDataCategory);
        const expectedBody = {
            errors: [
                {
                    code: "invalid_type",
                    expected: "string",
                    received: "number",
                    path: ["name"],
                    message: "Expected string, received number",
                },
            ],
        };
        (0, vitest_1.expect)(response.body).toEqual(expectedBody);
        (0, vitest_1.expect)(response.statusCode).toBe(400);
    }));
}));
