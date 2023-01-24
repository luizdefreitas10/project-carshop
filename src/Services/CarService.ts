import Cars from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarsODM from '../Models/CarsODM';

export default class CarService {
  private createCarDomain(car: ICar | null): Cars | null {
    if (car) {
      return new Cars(car);
    }
    return null;
  }

  public async register(data: ICar) {
    const carODM = new CarsODM();
    const newCar = await carODM.create(data);
    return this.createCarDomain(newCar);
  }
}
