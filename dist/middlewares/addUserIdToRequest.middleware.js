"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserIdToRequest = void 0;
const AddUserIdToRequest = (req, res, next) => {
    const userId = res.locals.userId;
    if (userId) {
        req.body.userId = userId;
    }
    next();
};
exports.AddUserIdToRequest = AddUserIdToRequest;
