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
(0, vitest_1.describe)("get tasks", () => {
    let taskDataList;
    let createdCategory;
    let createdTasks;
    (0, vitest_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        createdCategory = yield prisma_1.prisma.category.create({
            data: { name: "Example" },
        });
        taskDataList = [
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
        createdTasks = yield prisma_1.prisma.task.findMany();
    }));
    (0, vitest_1.it)("should be able to list all tasks successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield setupFiles_1.request.get("/tasks");
        const expectedBody = [
            {
                id: createdTasks[0].id,
                title: taskDataList[0].title,
                content: taskDataList[0].content,
                finished: false,
                category: null,
            },
            {
                id: createdTasks[1].id,
                title: taskDataList[1].title,
                content: taskDataList[1].content,
                finished: false,
                category: { id: createdCategory === null || createdCategory === void 0 ? void 0 : createdCategory.id, name: createdCategory === null || createdCategory === void 0 ? void 0 : createdCategory.name },
            },
        ];
        (0, vitest_1.expect)(response.body).toEqual(expectedBody);
        (0, vitest_1.expect)(response.statusCode).toBe(200);
    }));
    (0, vitest_1.it)("should be able to get tasks from specific category name query param", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield setupFiles_1.request.get(`/tasks?category=${createdCategory === null || createdCategory === void 0 ? void 0 : createdCategory.name}`);
        const expectedBody = [
            {
                id: createdTasks[1].id,
                title: taskDataList[1].title,
                content: taskDataList[1].content,
                finished: false,
                category: { id: createdCategory === null || createdCategory === void 0 ? void 0 : createdCategory.id, name: createdCategory === null || createdCategory === void 0 ? void 0 : createdCategory.name },
            },
        ];
        (0, vitest_1.expect)(response.body).toEqual(expectedBody);
        (0, vitest_1.expect)(response.statusCode).toBe(200);
    }));
    (0, vitest_1.it)("should be able to get a single task by id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield setupFiles_1.request.get(`/tasks/${createdTasks[1].id}`);
        const expectedBody = {
            id: createdTasks[1].id,
            title: taskDataList[1].title,
            content: taskDataList[1].content,
            finished: false,
            category: { id: createdCategory === null || createdCategory === void 0 ? void 0 : createdCategory.id, name: createdCategory === null || createdCategory === void 0 ? void 0 : createdCategory.name },
        };
        (0, vitest_1.expect)(response.body).toEqual(expectedBody);
        (0, vitest_1.expect)(response.statusCode).toBe(200);
    }));
    (0, vitest_1.it)("should return an error getting a task with non existing id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield setupFiles_1.request.get("/tasks/99999");
        const expectedBody = {
            message: "Task not found",
        };
        (0, vitest_1.expect)(response.body).toEqual(expectedBody);
        (0, vitest_1.expect)(response.statusCode).toBe(404);
    }));
});
