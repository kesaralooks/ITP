export class AmbulanceData {
  id: number;
    licensePlate: string;
    vehicleModel: string;
    other: string;

    constructor(ambulanceObject: any) {
      this.id = ambulanceObject.id;
      this.vehicleModel = ambulanceObject.vehicleModel;
      this.licensePlate = ambulanceObject.licensePlate;
      this.other = ambulanceObject.other;
    }
}
