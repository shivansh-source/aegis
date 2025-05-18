"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const countries_1 = __importDefault(require("./routes/countries"));
const simulate_1 = __importDefault(require("./routes/simulate"));
const results_1 = __importDefault(require("./routes/results"));
const military_1 = __importDefault(require("./routes/military"));
const logger_1 = require("./middleware/logger");
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: config_1.config.CORS_ORIGIN,
    methods: ['GET', 'POST']
}));
app.use(express_1.default.json());
app.use(logger_1.logger);
app.use('/api/countries', countries_1.default);
app.use('/api/simulate', simulate_1.default);
app.use('/api/results', results_1.default);
app.use('/api/military', military_1.default);
app.use(errorHandler_1.errorHandler);
app.listen(config_1.config.PORT, () => {
    console.log(`Server running on port ${config_1.config.PORT}`);
});
