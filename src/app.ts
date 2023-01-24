import express from 'express';
import carRouter from './Routes';
import HandleError from './Middlewares/HandleError';

const app = express();

app.use(express.json());
app.use(carRouter);
app.use(HandleError.handle);

export default app;