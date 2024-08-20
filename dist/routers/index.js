"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = exports.categoryRouter = exports.tasksRouter = void 0;
var task_router_1 = require("./task.router");
Object.defineProperty(exports, "tasksRouter", { enumerable: true, get: function () { return task_router_1.tasksRouter; } });
var category_router_1 = require("./category.router");
Object.defineProperty(exports, "categoryRouter", { enumerable: true, get: function () { return category_router_1.categoryRouter; } });
var user_router_1 = require("./user.router");
Object.defineProperty(exports, "userRouter", { enumerable: true, get: function () { return user_router_1.userRouter; } });
