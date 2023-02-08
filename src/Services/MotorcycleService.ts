import IMotorcycle from '../Interfaces/IMotorcycle';
import Motorcycle from '../Domains/Motorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import HttpErrorMessage from '../Utils/httpErrorMessage';

const HTTP_422_ERROR_MESSAGE = 'Invalid mongo id';
const HTTP_404_ERROR_MESSAGE = 'Motorcycle not found';

export default class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }
  
  public async register(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.create(motorcycle);
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async findAll() {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycles = await motorcycleODM.findAll();
    const listOfMotorcycles = newMotorcycles.map((moto) => this.createMotorcycleDomain(moto));
    return listOfMotorcycles;
  }

  public async findBydId(id: string) {
    const motorcycleODM = new MotorcycleODM();
    if (id.length !== 24) throw new HttpErrorMessage(422, HTTP_422_ERROR_MESSAGE); 
    const motorcycleId = await motorcycleODM.findById(id);
    if (!motorcycleId) throw new HttpErrorMessage(404, HTTP_404_ERROR_MESSAGE);
    return this.createMotorcycleDomain(motorcycleId);
  }

  public async updateById(id: string, motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();  
    if (id.length !== 24) throw new HttpErrorMessage(422, HTTP_422_ERROR_MESSAGE);
    const motorcycleId = await motorcycleODM.update(id, motorcycle);
    if (!motorcycleId) throw new HttpErrorMessage(404, HTTP_404_ERROR_MESSAGE);
    return this.createMotorcycleDomain(motorcycleId);
  }

  public async delete(id: string) {
    const motorcycleODM = new MotorcycleODM();
    if (id.length !== 24) throw new HttpErrorMessage(422, HTTP_422_ERROR_MESSAGE);
    const response = await motorcycleODM.delete(id);
    if (!response) throw new HttpErrorMessage(404, HTTP_404_ERROR_MESSAGE);
    return null;
  }
}
