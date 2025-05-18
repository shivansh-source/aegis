"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const countryController_1 = require("../controllers/countryController");
const validation_1 = require("../middleware/validation");
const router = (0, express_1.Router)();
router.get('/', countryController_1.getCountries);
router.get('/:countryCode', validation_1.validateCountryCode, countryController_1.getCountries);
exports.default = router;
