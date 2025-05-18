"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startSimulation = void 0;
const warEngine_1 = require("../services/warEngine");
const simulationStorage_1 = require("../services/simulationStorage");
const uuid_1 = require("uuid");
const startSimulation = (req, res) => {
    try {
        const config = req.body;
        // Generate simulation results
        const result = (0, warEngine_1.runWarSimulation)(config);
        // Generate a unique ID
        const simulationId = (0, uuid_1.v4)();
        result.simulationId = simulationId;
        // Store in our storage service
        (0, simulationStorage_1.saveResult)(simulationId, result);
        // Return the ID for future retrieval
        res.status(201).json({
            simulationId,
            redirectUrl: `/results/${simulationId}`
        });
    }
    catch (error) {
        console.error('Simulation error:', error);
        res.status(500).json({ error: 'Failed to run simulation' });
    }
};
exports.startSimulation = startSimulation;
