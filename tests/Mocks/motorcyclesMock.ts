import IMotorcycle from '../../src/Interfaces/IMotorcycle';

const HONDA = 'Honda Cb 600f Hornet';

const motorcycle: IMotorcycle = {
  model: HONDA,
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600,
};

export const motorcycleFindAll: IMotorcycle[] = [
  {
    id: '634852326b35b59438fbea2f',
    model: HONDA,
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,
  },
];

export const motorcycleById: IMotorcycle = {
  id: '634852326b35b59438fbea2f',
  model: HONDA,
  year: 2005,
  color: 'Yellow',
  status: true,
  buyValue: 30.000,
  category: 'Street',
  engineCapacity: 600,
};

export default motorcycle;