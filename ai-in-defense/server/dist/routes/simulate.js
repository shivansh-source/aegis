"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/simulate.ts
const express_1 = require("express");
const simulationController_1 = require("../controllers/simulationController");
const validateSimulation_1 = require("../middleware/validateSimulation");
const router = (0, express_1.Router)();
router.post('/', validateSimulation_1.validateSimulation, simulationController_1.startSimulation);
exports.default = router;
