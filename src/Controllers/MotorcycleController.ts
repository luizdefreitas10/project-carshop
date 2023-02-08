import { NextFunction, Request, Response } from 'express';
import MotorcycleService from '../Services/MotorcycleService';
import IMotorcycle from '../Interfaces/IMotorcycle';

export default class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const motorcycle: IMotorcycle = {
      ...this.req.body,
    };

    try {
      const moto = await this.service.register(motorcycle);
      return this.res.status(201).json(moto);
    } catch (e) {
      this.next(e);
    }
  }

  public async findAll() {
    try {
      const motorcycles = await this.service.findAll();
      return this.res.status(200).json(motorcycles);
    } catch (error) {
      this.next(error);
    }
  }

  public async findById() {
    try {
      const { id } = this.req.params;
      const motorcycleId = await this.service.findById(id);
      if (!motorcycleId) return this.res.status(404).json({ message: 'Motorcycle not found' });
      return this.res.status(200).json(motorcycleId);
    } catch (error) {
      this.next(error);
    }
  }

  public async updateById() {
    try {
      const { id } = this.req.params;
      const motorcycle = this.req.body;
      const motorcycleById = await this.service.updateById(id, motorcycle);
      return this.res.status(200).json(motorcycleById);
    } catch (e) {
      this.next(e);
    }
  }
}