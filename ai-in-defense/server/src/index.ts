import express from 'express';
import cors from 'cors';
import { config } from './config';
import countryRouter from './routes/countries';
import simulateRouter from './routes/simulate';
import resultsRouter from './routes/results';
import militaryRouter from './routes/military';
import { logger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';

const app = express();

app.use(cors({
  origin: config.CORS_ORIGIN,
  methods: ['GET', 'POST']
}));

app.use(express.json());
app.use(logger);

app.use('/api/countries', countryRouter);
app.use('/api/simulate', simulateRouter);
app.use('/api/results', resultsRouter);
app.use('/api/military', militaryRouter);

app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});