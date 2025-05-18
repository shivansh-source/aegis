"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResult = exports.saveResult = void 0;
const store = {};
const saveResult = (id, result) => {
    store[id] = result;
};
exports.saveResult = saveResult;
const getResult = (id) => {
    return store[id];
};
exports.getResult = getResult;
