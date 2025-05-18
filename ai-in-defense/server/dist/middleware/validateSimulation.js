"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simulationSchema = exports.validateSimulation = void 0;
const zod_1 = require("zod");
const weaponSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    type: zod_1.z.string(),
    modernizationLevel: zod_1.z.number()
});
const troopSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    type: zod_1.z.string(),
    quantity: zod_1.z.number().min(1)
});
// Schema that matches the SimulationConfig exactly
const simulationSchema = zod_1.z.object({
    countryA: zod_1.z.string(),
    countryB: zod_1.z.string(),
    latA: zod_1.z.number(),
    lngA: zod_1.z.number(),
    latB: zod_1.z.number(),
    lngB: zod_1.z.number(),
    troopsA: zod_1.z.array(troopSchema),
    troopsB: zod_1.z.array(troopSchema),
    weaponsA: zod_1.z.array(weaponSchema),
    weaponsB: zod_1.z.array(weaponSchema)
});
exports.simulationSchema = simulationSchema;
const validateSimulation = (req, res, next) => {
    console.log('Validating simulation data:', JSON.stringify(req.body, null, 2));
    const result = simulationSchema.safeParse(req.body);
    if (!result.success) {
        console.error('Validation errors:', JSON.stringify(result.error.errors, null, 2));
        return res.status(400).json({
            error: 'Invalid simulation data',
            details: result.error.errors
        });
    }
    console.log('Validation successful');
    req.body = result.data;
    next();
};
exports.validateSimulation = validateSimulation;
