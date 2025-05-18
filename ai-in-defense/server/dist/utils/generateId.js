"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = void 0;
// src/utils/generateId.ts
const generateId = () => {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
};
exports.generateId = generateId;
