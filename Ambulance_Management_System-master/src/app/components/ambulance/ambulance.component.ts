import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AmbulanceData } from '../../models/data';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-patient',
  templateUrl: './ambulance.component.html',
  styleUrls: ['./ambulance.component.css']
})
export class AmbulanceComponent implements OnInit {
  constructor(private dataService: DataService, private formBuilder: FormBuilder) { }
  public ambulance: AmbulanceData[];
  ambulanceForm: FormGroup;
  modalMod: string;
  edit: boolean;
  openedAmbulance: AmbulanceData;

  ngOnInit(): void {

    this.dataService.GetAmbulanceDatas().subscribe(

      (result: any ) => {
        this.ambulance = result;
        console.log(this.ambulance);
       });
    this.ambulanceForm = this.formBuilder.group({
      ambulanceId: '',
      licensePlate: '',
      vehicleModel: '',
      other: ''
    });
  }

  AddPatientButton() {
    this.edit = false;
    this.modalMod = 'add';
    console.log(this.edit);
    this.ClearPatientForm();
  }
  AddUpdatePatient() {
    switch (this.modalMod) {
      case 'add':
        // this.ambulanceForm.value.id = this.dataService.GetAmbulanceDatas().subscribe();
        this.dataService.AddPatient(this.ambulanceForm.value, 'add').subscribe();
        this.ClearPatientForm();
        break;
      case 'update':
        console.log(this.ambulanceForm.value);
        // this.ambulanceForm.value.id = this.dataService.GetAmbulanceDatas().subscribe();
        this.dataService.AddPatient(this.ambulanceForm.value, 'update').subscribe();
        this.refresh();
        break;
    }
  }
  RemovePatient(patient: AmbulanceData) {
    console.log(patient);
    const index = this.ambulance.indexOf(patient);
    this.ambulance.splice(index, 1);
    this.dataService.removeRecord(patient).subscribe();
  }
  ClearPatientForm() {
    this.ControlSetValueLoop(undefined);
  }
  viewAll() {
    this.dataService.GetAmbulanceDatas().subscribe(

      (result: any ) => {
        this.ambulance = result;
        console.log(this.ambulance);
      });
  }
  EditOpenModal(pati: AmbulanceData) {
    this.edit = true;
    this.modalMod = 'update';
    this.openedAmbulance = pati;
    this.ControlSetValueLoop(pati);
    this.viewAll();
  }
  ControlSetValueLoop(pati: AmbulanceData) {
    const patientControls = this.ambulanceForm.controls;
    for (const key in patientControls) {
      if (patientControls.hasOwnProperty(key)) {
        const control = patientControls[key];
        if (pati === undefined) {
          control.setValue('');
        } else {
          control.setValue(pati[key]);
        }
      }
    }
  }
  refresh(): void {
    window.location.reload();
  }
}
