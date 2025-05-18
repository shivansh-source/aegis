"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/results.ts
const express_1 = require("express");
const resultController_1 = require("../controllers/resultController");
const router = (0, express_1.Router)();
router.get('/:simulationId', resultController_1.getSimulationResult);
exports.default = router;
