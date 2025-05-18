"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSimulationInput = exports.validateCountryCode = void 0;
const zod_1 = require("zod");
// Country code validation (2-letter uppercase)
const countryCodeSchema = zod_1.z.string().length(2).regex(/^[A-Z]{2}$/);
const validateCountryCode = (req, res, next) => {
    const validation = countryCodeSchema.safeParse(req.params.countryCode);
    if (!validation.success) {
        return res.status(400).json({
            error: 'Invalid country code',
            details: validation.error.errors
        });
    }
    next();
};
exports.validateCountryCode = validateCountryCode;
// Example simulation input validator
const validateSimulationInput = (req, res, next) => {
    const schema = zod_1.z.object({
        countryA: zod_1.z.string().length(2),
        countryB: zod_1.z.string().length(2),
        duration: zod_1.z.number().min(1).max(365)
    });
    const validation = schema.safeParse(req.body);
    if (!validation.success) {
        return res.status(400).json({
            error: 'Invalid simulation input',
            details: validation.error.errors
        });
    }
    next();
};
exports.validateSimulationInput = validateSimulationInput;
