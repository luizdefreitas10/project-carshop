import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarsODM from '../Models/CarsODM';
import HttpErrorMessage from '../Utils/httpErrorMessage';

const HTTP_422_ERROR_MESSAGE = 'Invalid mongo id';
const HTTP_404_ERROR_MESSAGE = 'Motorcycle not found';

export default class CarService {
  private createCarDomain(car: ICar): Car | null {
    return new Car(car);
  }

  public async register(car: ICar) {
    const carModel = new CarsODM();
    const newCar = await carModel.create(car);
    return this.createCarDomain(newCar);
  }

  public async findAll() {
    const carModel = new CarsODM();
    const cars = await carModel.findAll();
    const carDomainList = cars.map((car) => this.createCarDomain(car));
    return carDomainList;
  }

  public async findById(id: string) {
    const carModel = new CarsODM();  
    if (id.length !== 24) throw new HttpErrorMessage(422, HTTP_422_ERROR_MESSAGE);
    const carResponse = await carModel.findById(id);
    if (!carResponse) throw new HttpErrorMessage(404, HTTP_404_ERROR_MESSAGE);
    return this.createCarDomain(carResponse);
  }

  public async updateById(id: string, obj: ICar) {
    const carModel = new CarsODM();  
    if (id.length !== 24) throw new HttpErrorMessage(422, HTTP_422_ERROR_MESSAGE);
    const carResponse = await carModel.update(id, obj);
    if (!carResponse) throw new HttpErrorMessage(404, HTTP_404_ERROR_MESSAGE);
    return this.createCarDomain(carResponse);
  }
}
