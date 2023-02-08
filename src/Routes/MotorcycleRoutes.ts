import express from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const motorcycleRouter = express.Router();

motorcycleRouter
  .post('/motorcycles', (req, res, next) => new MotorcycleController(req, res, next).create());

motorcycleRouter
  .get('/motorcycles', (req, res, next) => new MotorcycleController(req, res, next).findAll());

motorcycleRouter
  .get('/motorcycle/:id', (req, res, next) => new MotorcycleController(req, res, next).findById());

motorcycleRouter.put(
  '/motorcycles/:id',
  (req, res, next) => new MotorcycleController(req, res, next).updateById(),
);

export default motorcycleRouter;
