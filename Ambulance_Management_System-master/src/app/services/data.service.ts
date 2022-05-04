import { AmbulanceData } from './../models/data';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  public BASE_URL = 'http://localhost:8285/ambulnce-mngmnt/';
  private headers;

  constructor(private httpClient: HttpClient) { }

  // patientData: AmbulanceData[] = this.GetExampleJSON().ambulanceRecords;

  // GetExampleJSON() {
  //   const exampleJSON = {
  //     ambulanceRecords: [
  //       { id: 1, licensePlate: 'Rohit', vehicleModel: 'Joes', other: 'IN-3123'}
  //     ]
  //   };
  //   return exampleJSON;
  // }



  GetAmbulanceDatas() {

    return this.httpClient.get(this.BASE_URL + 'api/view-all/' , {headers: this.headers});
  }
  AddPatient(newPatient: AmbulanceData, type): Observable<any> {
    if (type === 'add') {
      console.log('newPatient');
      console.log(newPatient);
      return this.httpClient.post(this.BASE_URL + 'api/register-ambulance/' , newPatient , {headers: this.headers});
    } else {
      console.log('update Ambulance');
      console.log(newPatient);
      return this.httpClient.post(this.BASE_URL + 'api/update-ambulance/' , newPatient , {headers: this.headers});
    }
  }

  removeRecord(ambulance: AmbulanceData) {
    console.log('Danidu');
    return this.httpClient.post(this.BASE_URL + 'api/remove-ambulance/' , ambulance , {headers: this.headers});
  }
}
