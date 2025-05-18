"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runWarSimulation = void 0;
const runWarSimulation = (config) => {
    // Calculate strength using troops and weapons
    const calculateStrength = (troops, weapons) => {
        const troopStrength = troops.reduce((sum, t) => sum + t.quantity, 0);
        const avgModernization = weapons.length > 0
            ? weapons.reduce((sum, w) => sum + w.modernizationLevel, 0) / weapons.length
            : 1;
        return troopStrength * avgModernization;
    };
    const strengthA = calculateStrength(config.troopsA, config.weaponsA);
    const strengthB = calculateStrength(config.troopsB, config.weaponsB);
    const totalStrength = strengthA + strengthB || 1;
    const probabilityA = (strengthA / totalStrength) * 100;
    const winner = probabilityA > 50 ? config.countryA : config.countryB;
    // Generate troop positions
    const troopPositions = [
        ...config.troopsA.map(t => ({
            lat: config.latA + (Math.random() * 2 - 1),
            lng: config.lngA + (Math.random() * 2 - 1),
            side: 'A'
        })),
        ...config.troopsB.map(t => ({
            lat: config.latB + (Math.random() * 2 - 1),
            lng: config.lngB + (Math.random() * 2 - 1),
            side: 'B'
        }))
    ];
    return {
        ...config,
        simulationId: "", // Will be set by controller
        winner,
        probability: winner === config.countryA ? probabilityA : 100 - probabilityA,
        casualties: Math.abs(strengthA - strengthB) * 0.3,
        troopPositions
    };
};
exports.runWarSimulation = runWarSimulation;
