"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateBody = void 0;
class ValidateBody {
    static execute(schema) {
        return (req, res, next) => {
            schema.parse(req.body);
            next();
        };
    }
    ;
}
exports.ValidateBody = ValidateBody;
