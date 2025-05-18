"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSimulationResult = void 0;
const simulationStorage_1 = require("../services/simulationStorage");
const getSimulationResult = async (req, res, next) => {
    try {
        const { simulationId } = req.params;
        const result = (0, simulationStorage_1.getResult)(simulationId);
        if (!result) {
            return res.status(404).json({ error: "Simulation not found" });
        }
        res.json(result);
    }
    catch (err) {
        next(err);
    }
};
exports.getSimulationResult = getSimulationResult;
