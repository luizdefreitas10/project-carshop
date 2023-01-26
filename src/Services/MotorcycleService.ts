import IMotorcycle from '../Interfaces/IMotorcycle';
import Motorcycle from '../Domains/Motorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';
import HttpErrorMessage from '../Utils/httpErrorMessage';

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
    if (id.length !== 24) throw new HttpErrorMessage(422, 'Invalid mongo id'); 
    const motorcycleId = await motorcycleODM.findById(id);
    if (!motorcycleId) throw new HttpErrorMessage(404, 'Motorcycle not found');
    return this.createMotorcycleDomain(motorcycleId);
  }
}
