"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const militaryController_1 = require("../controllers/militaryController");
const validation_1 = require("../middleware/validation");
const router = express_1.default.Router();
// This adds /troops and /weapons endpoints directly under /api/military
router.get('/troops/:countryCode', validation_1.validateCountryCode, militaryController_1.getTroopsByCountry);
router.get('/weapons/:countryCode', validation_1.validateCountryCode, militaryController_1.getWeaponsByCountry);
exports.default = router;
