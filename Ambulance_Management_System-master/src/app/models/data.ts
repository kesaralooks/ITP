export class AmbulanceData {
  ambulanceId: number;
    licensePlate: string;
    vehicleModel: string;
    other: string;

    constructor(ambulanceObject: any) {
      this.ambulanceId = ambulanceObject.ambulanceId;
      this.vehicleModel = ambulanceObject.vehicleModel;
      this.licensePlate = ambulanceObject.licensePlate;
      this.other = ambulanceObject.other;
    }
}
