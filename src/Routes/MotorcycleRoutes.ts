import express from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const MOTORCYCLE_ID_ROUTE = '/motorcycles/:id';

const motorcycleRouter = express.Router();

motorcycleRouter.post('/motorcycles', (req, res, next) =>
  new MotorcycleController(req, res, next).create());

motorcycleRouter.get('/motorcycles', (req, res, next) =>
  new MotorcycleController(req, res, next).findAll());

motorcycleRouter.get(MOTORCYCLE_ID_ROUTE, (req, res, next) =>
  new MotorcycleController(req, res, next).findById());

motorcycleRouter.put(MOTORCYCLE_ID_ROUTE, (req, res, next) =>
  new MotorcycleController(req, res, next).updateById());

motorcycleRouter.delete(MOTORCYCLE_ID_ROUTE, (req, res, next) =>
  new MotorcycleController(req, res, next).delete());

export default motorcycleRouter;
