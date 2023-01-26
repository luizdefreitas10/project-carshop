import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';
import { car, cars, findCarById } from '../../Mocks/carMock';

describe('Testando as camadas associadas a carros', function () {
  it('Verifica se é possível registrar um carro corretamente', async function () {
    const newCar: Car = new Car(car);
    sinon.stub(Model, 'create').resolves(newCar);

    const carService = new CarService();
    const response = await carService.register(car);

    expect(response).to.be.deep.equal(newCar);
  });

  it('Verifica se é possível listar todos os carros', async function () {
    sinon.stub(Model, 'find').resolves(cars);

    const carService = new CarService();
    const response = await carService.findAll();

    expect(response).to.be.deep.equal(cars);
  });

  it('verifica se é possível localizar um carro através do ID', async function () {
    const id = '63c58cf07f367d16a9b6463d';
    sinon.stub(Model, 'findById').resolves(findCarById);

    const carService = new CarService();
    const response = await carService.findById(id);

    expect(response).to.be.deep.equal(findCarById);
  });

  afterEach(function () {
    sinon.restore();
  });
});
