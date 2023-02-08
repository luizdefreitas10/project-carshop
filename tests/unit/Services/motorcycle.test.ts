import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Motorcycle from '../../../src/Domains/Motorcycle';
import motorcycle, { motorcycleFindAll, motorcycleById } from '../../Mocks/motorcyclesMock';
import MotorcycleService from '../../../src/Services/MotorcycleService';

const INVALID_ID = 'Invalid mongo id';
const MOTOR_NOT_FOUND = 'Motorcycle not found';

describe('Testando as camadas associadas a motos', function () {
  it('Verifica se é possível realizar o registro de uma moto', async function () {
    const newMotorcycle: Motorcycle = new Motorcycle(motorcycle);
    sinon.stub(Model, 'create').resolves(newMotorcycle);

    const motorcycleService = new MotorcycleService();
    const response = await motorcycleService.register(motorcycle);

    expect(response).to.be.deep.equal(newMotorcycle);
  });

  it('Verifica se é possivel listar todas as motos', async function () {
    sinon.stub(Model, 'find').resolves(motorcycleFindAll);

    const service = new MotorcycleService();
    const response = await service.findAll();

    expect(response).to.be.deep.equal(motorcycleFindAll);
  });

  it('Verifica se é possivel listar uma moto por id', async function () {
    const id = '634852326b35b59438fbea2f';
    sinon.stub(Model, 'findOne').resolves(motorcycleById);

    const service = new MotorcycleService();
    const response = await service.findBydId(id);

    expect(response).to.be.deep.equal(motorcycleById);
  });

  it('Verifica se retorna 422 como httpstatus quando busca por um id invalido', async function () {
    const id = '63c58cf07f3b663d';

    sinon.stub(Model, 'findOne').resolves({});

    try {
      const service = new MotorcycleService();
      await service.findBydId(id);
    } catch (e) {
      expect((e as Error).message).to.be.equal(INVALID_ID);
    }
  });

  it('Verifica se retorna 404 quando busca por um id inexistente', async function () {
    const id = '63c58cf07f367d16a9b663ad';

    sinon.stub(Model, 'findOne').resolves(undefined);

    try {
      const service = new MotorcycleService();
      await service.findBydId(id);
    } catch (e) {
      expect((e as Error).message).to.be.equal(MOTOR_NOT_FOUND);
    }
  });

  it('Verifica se é possível atualizar uma moto por id', async function () {
    const id = '63c58cf07f367d16a9b6463d';

    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleById);

    const service = new MotorcycleService();
    const response = await service.updateById(id, motorcycle);
    expect(response).to.be.deep.equal(motorcycleById);
  });

  it('Verifica se retorna httpstatus 422 ao atualizar uma moto com id invalido', async function () {
    const id = '63c58cf07f367d63d';

    sinon.stub(Model, 'findOneAndUpdate').resolves({});

    try {
      const service = new MotorcycleService();
      await service.updateById(id, motorcycle);
    } catch (e) {
      expect((e as Error).message).to.be.equal(INVALID_ID);
    }
  });

  it('Verifica retorno 404 ao tentar atualizar moto com id inexistente', async function () {
    const id = '63c58cf07f367d16a9b6463d';

    sinon.stub(Model, 'findOneAndUpdate').resolves(undefined);

    try {
      const service = new MotorcycleService();
      await service.updateById(id, motorcycle);
    } catch (e) {
      expect((e as Error).message).to.be.equal(MOTOR_NOT_FOUND);
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});