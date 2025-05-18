"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCountryDetails = exports.getCountries = void 0;
const warDataService_1 = require("../services/warDataService");
const getCountries = async (_, res) => {
    try {
        const countries = await (0, warDataService_1.getCountryData)();
        res.json(countries);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getCountries = getCountries;
const getCountryDetails = async (req, res) => {
    try {
        const { countryCode } = req.params;
        const countries = await (0, warDataService_1.getCountryData)();
        const country = countries.find(c => c.code === countryCode);
        if (!country) {
            return res.status(404).json({ error: 'Country not found' });
        }
        res.json(country);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getCountryDetails = getCountryDetails;
