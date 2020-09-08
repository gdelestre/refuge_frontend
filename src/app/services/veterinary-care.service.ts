import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VeterinaryCare } from '../classes/veterinary-care';
import { Veterinary } from '../classes/veterinary';

@Injectable({
  providedIn: 'root'
})
export class VeterinaryCareService {

  private baseUrl = 'http://localhost:8080/api/';

  constructor(private httpClient: HttpClient) { }

  getVeterinaryCaresByAnimals(id:String): Observable<VeterinaryCare[]> {
    const url = `${this.baseUrl}/${id}/care`;

    return this.httpClient.get<VeterinaryCare[]>(url);
  }

  getAllVeterinaries(): Observable<Veterinary[]>{
    const url = `${this.baseUrl}/veterinary/`;
    return this.httpClient.get<Veterinary[]>(url);
  }

}
