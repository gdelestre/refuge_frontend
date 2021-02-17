import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdoptAnimal } from '../classes/adopt-animal';

//const baseUrl = 'http://refuge-env.eba-kpfvmekf.eu-west-3.elasticbeanstalk.com/api/adoption';
const baseUrl = 'https://192.168.1.20:8443/refuge/api/adoption';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://192.168.1.20:8443',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AdoptAnimalService {

  constructor(private httpClient: HttpClient) { }

  getAllAdoptions(): Observable<AdoptAnimal[]> {
    return this.httpClient.get<AdoptAnimal[]>(baseUrl, httpOptions);
  }

  createAdoption(adoption: object) {
    return this.httpClient.post(baseUrl, adoption, httpOptions);
  }

  deleteAdoptionByAnimalId(id: string): Observable<AdoptAnimal> {
    const url = `${baseUrl}/${id}`;
    return this.httpClient.delete<AdoptAnimal>(url, httpOptions);
  }


}
