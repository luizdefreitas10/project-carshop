import express from 'express';
import CarController from '../Controllers/CarController';

const CARS_ID_ROUTE = '/cars/:id';

const carRouter = express.Router();

carRouter.post('/cars', (req, res, next) =>
  new CarController(req, res, next).create());

carRouter.get(CARS_ID_ROUTE, (req, res, next) =>
  new CarController(req, res, next).findById());

carRouter.get('/cars', (req, res, next) =>
  new CarController(req, res, next).findAll());

carRouter.put(CARS_ID_ROUTE, (req, res, next) =>
  new CarController(req, res, next).updateById());

carRouter.delete(CARS_ID_ROUTE, (req, res, next) =>
  new CarController(req, res, next).delete());

export default carRouter;
