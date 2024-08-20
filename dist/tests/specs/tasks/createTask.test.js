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
(0, vitest_1.describe)("create task", () => {
    (0, vitest_1.it)("should be able to create a task without category successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const task = {
            title: "Lorem ipsum",
            content: "Lorem ipsum",
        };
        const response = yield setupFiles_1.request.post("/tasks").send(task);
        const expectedBody = {
            id: vitest_1.expect.any(Number),
            title: task.title,
            content: task.content,
            finished: false,
            categoryId: null,
        };
        (0, vitest_1.expect)(response.body).toEqual(expectedBody);
        (0, vitest_1.expect)(response.statusCode).toBe(201);
    }));
    (0, vitest_1.it)("should return an error when creating a task in a non existing category id", () => __awaiter(void 0, void 0, void 0, function* () {
        const taskWithInvalidCategory = {
            title: "Lorem ipsum",
            content: "Lorem ipsum",
            categoryId: 1,
        };
        const response = yield setupFiles_1.request.post("/tasks").send(taskWithInvalidCategory);
        const expectedBody = {
            message: "Category not found",
        };
        (0, vitest_1.expect)(response.body).toEqual(expectedBody);
        (0, vitest_1.expect)(response.statusCode).toBe(404);
    }));
    (0, vitest_1.it)("should return an error when creating a task with empty body", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield setupFiles_1.request.post("/tasks").send({});
        const expectedBody = {
            errors: [
                {
                    code: "invalid_type",
                    expected: "string",
                    received: "undefined",
                    path: ["title"],
                    message: "Required",
                },
                {
                    code: "invalid_type",
                    expected: "string",
                    received: "undefined",
                    path: ["content"],
                    message: "Required",
                },
            ],
        };
        (0, vitest_1.expect)(response.body).toEqual(expectedBody);
        (0, vitest_1.expect)(response.statusCode).toBe(400);
    }));
    (0, vitest_1.it)("should return an error when creating a task with invalid data types", () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidDataTask = {
            title: 123,
            content: 123,
        };
        const response = yield setupFiles_1.request
            .post("/tasks")
            .send(invalidDataTask)
            .expect(400);
        const expectedBody = {
            errors: [
                {
                    code: "invalid_type",
                    expected: "string",
                    received: "number",
                    path: ["title"],
                    message: "Expected string, received number",
                },
                {
                    code: "invalid_type",
                    expected: "string",
                    received: "number",
                    path: ["content"],
                    message: "Expected string, received number",
                },
            ],
        };
        (0, vitest_1.expect)(response.body).toEqual(expectedBody);
        (0, vitest_1.expect)(response.statusCode).toBe(400);
    }));
});
