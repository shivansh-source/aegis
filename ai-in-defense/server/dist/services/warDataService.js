"use strict";
// src/services/warDataService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMilitaryData = exports.getCountryData = void 0;
// Mock data - in a real app, this would come from a database
const militaryDataByCountry = {
    "US": {
        troops: {
            average: 1.3,
            historical: [1.2, 1.25, 1.3, 1.35, 1.3]
        },
        modernization: {
            average: 0.95,
            historical: [0.88, 0.9, 0.92, 0.94, 0.95]
        }
    },
    "RU": {
        troops: {
            average: 0.9,
            historical: [1.1, 1.0, 0.95, 0.92, 0.9]
        },
        modernization: {
            average: 0.8,
            historical: [0.7, 0.72, 0.75, 0.78, 0.8]
        }
    },
    "CN": {
        troops: {
            average: 2.0,
            historical: [1.7, 1.8, 1.85, 1.95, 2.0]
        },
        modernization: {
            average: 0.85,
            historical: [0.75, 0.78, 0.8, 0.82, 0.85]
        }
    },
    "IN": {
        troops: {
            average: 1.5,
            historical: [1.3, 1.35, 1.4, 1.45, 1.5]
        },
        modernization: {
            average: 0.75,
            historical: [0.65, 0.68, 0.7, 0.72, 0.75]
        }
    },
    "JP": {
        troops: {
            average: 0.7,
            historical: [0.6, 0.63, 0.65, 0.68, 0.7]
        },
        modernization: {
            average: 0.9,
            historical: [0.8, 0.83, 0.85, 0.88, 0.9]
        }
    }
};
const getCountryData = async () => {
    return [
        { code: 'US', name: 'United States', flagUrl: 'https://flagcdn.com/us.svg' },
        { code: 'IN', name: 'India', flagUrl: 'https://flagcdn.com/in.svg' },
        { code: 'CN', name: 'China', flagUrl: 'https://flagcdn.com/cn.svg' },
        { code: 'JP', name: 'Japan', flagUrl: 'https://flagcdn.com/jp.svg' }
    ];
};
exports.getCountryData = getCountryData;
const getMilitaryData = (countryCode) => {
    console.log(`Getting military data for country: ${countryCode}`);
    const data = militaryDataByCountry[countryCode];
    console.log(`Data found: ${!!data}`);
    return data;
};
exports.getMilitaryData = getMilitaryData;
