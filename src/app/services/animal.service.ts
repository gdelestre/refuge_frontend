import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Animal } from '../classes/animal';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  private baseUrl = 'http://localhost:8080/api/animal';

  constructor(private httpClient: HttpClient) { }

  getAllAnimals(): Observable<Animal[]> {
    return this.httpClient.get<Animal[]>(this.baseUrl);
  }

  getAnimalsBySpecies(species:String): Observable<Animal[]>{
    const url = `${this.baseUrl}/species/${species}`;
    return this.httpClient.get<Animal[]>(url);
  }

  getOneAnimal(id: String): Observable<Animal>{
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<Animal>(url);
  }


}


