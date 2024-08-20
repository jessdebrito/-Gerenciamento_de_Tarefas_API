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
(0, vitest_1.describe)("update task", () => {
    (0, vitest_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        const createdCategory = yield prisma_1.prisma.category.create({
            data: { name: "Example" },
        });
        const taskDataList = [
            {
                title: "Lorem ipsum",
                content: "Lorem ipsum",
            },
            {
                title: "Lorem ipsum",
                content: "Lorem ipsum",
                categoryId: createdCategory === null || createdCategory === void 0 ? void 0 : createdCategory.id,
            },
        ];
        yield prisma_1.prisma.task.createMany({ data: taskDataList });
    }));
    (0, vitest_1.it)("should be able to update a task successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const task = yield prisma_1.prisma.task.findFirst();
        const updateTask = {
            title: "Updated title",
            content: "Updated content",
            finished: true,
        };
        const response = yield setupFiles_1.request.patch(`/tasks/${task === null || task === void 0 ? void 0 : task.id}`).send(updateTask);
        const expectedBody = {
            id: vitest_1.expect.any(Number),
            title: updateTask.title,
            content: updateTask.content,
            finished: updateTask.finished,
            categoryId: null,
        };
        (0, vitest_1.expect)(response.body).toEqual(expectedBody);
        (0, vitest_1.expect)(response.statusCode).toBe(200);
    }));
    (0, vitest_1.it)("should return an error updating a task with non existing id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield setupFiles_1.request.patch("/tasks/99999");
        const expectedBody = {
            message: "Task not found",
        };
        (0, vitest_1.expect)(response.body).toEqual(expectedBody);
        (0, vitest_1.expect)(response.statusCode).toBe(404);
    }));
    (0, vitest_1.it)("should return an error updating a task with invalid data types", () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidDataUpdateTask = {
            title: 123,
            content: 123,
            finished: "testing",
        };
        const task = yield prisma_1.prisma.task.findFirst();
        const response = yield setupFiles_1.request
            .patch(`/tasks/${task === null || task === void 0 ? void 0 : task.id}`)
            .send(invalidDataUpdateTask);
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
                {
                    code: "invalid_type",
                    expected: "boolean",
                    received: "string",
                    path: ["finished"],
                    message: "Expected boolean, received string",
                },
            ],
        };
        (0, vitest_1.expect)(response.body).toEqual(expectedBody);
        (0, vitest_1.expect)(response.statusCode).toBe(400);
    }));
});
