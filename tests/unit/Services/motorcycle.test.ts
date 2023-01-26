import { expect } from 'chai';
import { Model } from 'mongoose';
import sinon from 'sinon';
import Motorcycle from '../../../src/Domains/Motorcycle';
import motorcycle from '../../Mocks/motorcyclesMock';
import MotorcycleService from '../../../src/Services/MotorcycleService';

describe('Testando as camadas associadas a motos', function () {
  it('Verifica se é possível realizar o registro de uma moto', async function () {
    const newMotorcycle: Motorcycle = new Motorcycle(motorcycle);
    sinon.stub(Model, 'create').resolves(newMotorcycle);

    const motorcycleService = new MotorcycleService();
    const response = await motorcycleService.register(motorcycle);

    expect(response).to.be.deep.equal(newMotorcycle);
  });
});