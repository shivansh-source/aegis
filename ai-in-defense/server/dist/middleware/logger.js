"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const logger = (req, _, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
};
exports.logger = logger;
