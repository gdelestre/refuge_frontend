import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdoptAnimal } from '../classes/adopt-animal';

@Injectable({
  providedIn: 'root'
})
export class AdoptAnimalService {
  private baseUrl = 'http://refuge.francecentral.cloudapp.azure.com:8080/refuge/api/adoption';

  constructor(private httpClient: HttpClient) { }

  getAllAdoptions(): Observable<AdoptAnimal[]> {
    return this.httpClient.get<AdoptAnimal[]>(this.baseUrl);
  }

  createAdoption(adoption: object){
    return this.httpClient.post(this.baseUrl, adoption);
  }

  deleteAdoptionByAnimalId(id: string): Observable<AdoptAnimal>{
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete<AdoptAnimal>(url);
  }

 
}
