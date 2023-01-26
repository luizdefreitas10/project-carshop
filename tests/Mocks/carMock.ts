import ICar from '../../src/Interfaces/ICar';

export const car: ICar = {
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.99,
  doorsQty: 4,
  seatsQty: 5,
};

export const cars: ICar[] = [
  {
    id: '63c58cf07f367d16a9b6463d',
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.99,
    seatsQty: 5,
    doorsQty: 4,
  },
  {
    id: '63c58e4a7f367d16a9b64640',
    model: 'Marea',
    year: 2002,
    color: 'Black',
    status: true,
    buyValue: 15.99,
    seatsQty: 5,
    doorsQty: 4,
  },
];

export const findCarById: ICar = {
  id: '63c58cf07f367d16a9b6463d',
  model: 'Marea',
  year: 2002,
  color: 'Black',
  status: true,
  buyValue: 15.99,
  seatsQty: 5,
  doorsQty: 4,
};
