import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdoptAnimal } from '../classes/adopt-animal';

const baseUrl = 'http://refuge-env.eba-kpfvmekf.eu-west-3.elasticbeanstalk.com/api/adoption';
//const baseUrl = 'http://localhost:8080/api/adoption';

@Injectable({
  providedIn: 'root'
})
export class AdoptAnimalService {

  constructor(private httpClient: HttpClient) { }

  getAllAdoptions(): Observable<AdoptAnimal[]> {
    return this.httpClient.get<AdoptAnimal[]>(baseUrl);
  }

  createAdoption(adoption: object){
    return this.httpClient.post(baseUrl, adoption);
  }

  deleteAdoptionByAnimalId(id: string): Observable<AdoptAnimal>{
    const url = `${baseUrl}/${id}`;
    return this.httpClient.delete<AdoptAnimal>(url);
  }

 
}
