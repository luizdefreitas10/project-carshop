import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import Car from '../../../src/Domains/Car';
import CarService from '../../../src/Services/CarService';
import { car, cars, findCarById } from '../../Mocks/carMock';

const INVALID_ID = 'Invalid mongo id';
const CAR_NOT_FOUND = 'Car not found';

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

  it('Verifica se retorna 422 ao buscar com id invalido', async function () {
    const id = '63c58cf07f367d16a9b663d';

    sinon.stub(Model, 'findOne').resolves({});

    try {
      const service = new CarService();
      await service.findById(id);
    } catch (e) {
      expect((e as Error).message).to.be.equal(INVALID_ID);
    }
  });

  it('Verifica se retorna 404 ao buscar por id inexistente', async function () {
    const id = '63c58cf07f367d16a9b663ad';

    sinon.stub(Model, 'findOne').resolves(undefined);

    try {
      const service = new CarService();
      await service.findById(id);
    } catch (e) {
      expect((e as Error).message).to.be.equal(CAR_NOT_FOUND);
    }
  });

  it('Verifica se é possivel atualizar um carro por id', async function () {
    const id = '63c58cf07f367d16a9b6463d';

    sinon.stub(Model, 'findByIdAndUpdate').resolves(findCarById);

    const service = new CarService();
    const response = await service.updateById(id, car);
    expect(response).to.be.deep.equal(findCarById);
  });

  it('Verifica se retorna 422 ao atualizar por id invalido', async function () {
    const id = '63c58cf07f367d16a9b663d';

    sinon.stub(Model, 'findOne').resolves({});

    try {
      const service = new CarService();
      await service.updateById(id, car);
    } catch (e) {
      expect((e as Error).message).to.be.equal(INVALID_ID);
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});
