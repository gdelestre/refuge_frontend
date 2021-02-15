import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Animal } from '../classes/animal';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

//const baseUrl = 'http://refuge-env.eba-kpfvmekf.eu-west-3.elasticbeanstalk.com/api/animal';
const baseUrl = 'http://192.168.1.20:8080/refuge/api/animal';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor(private httpClient: HttpClient) { }

  getAllAnimals(): Observable<Animal[]> {
    return this.httpClient.get<Animal[]>(baseUrl);
  }

  getAnimalsBySpecies(species: string): Observable<Animal[]> {
    const url = `${baseUrl}/species/${species}`;
    return this.httpClient.get<Animal[]>(url);
  }

  getOneAnimal(id: string): Observable<Animal> {
    const url = `${baseUrl}/${id}`;
    return this.httpClient.get<Animal>(url);
  }

  getAnimalsInHostFamily(): Observable<Animal[]> {
    const url = `${baseUrl}/host`;
    return this.httpClient.get<Animal[]>(url);
  }

  getAdoptedAnimals(): Observable<Animal[]> {
    const url = `${baseUrl}/adoptive`;
    return this.httpClient.get<Animal[]>(url);
  }

  createAnimal(animal: object): Observable<object> {
    return this.httpClient.post(baseUrl, animal).pipe(catchError(this.handleError));
  }

  updateAnimal(animal: object): Observable<object> {
    return this.httpClient.put(baseUrl, animal).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.status == 403) {
      errorMessage = `Ajout ou Modification impossible! Ce nom est déjà utilisé.`;
    } else {
      errorMessage = `Erreur. L'ajout ou la modification de l'animal n'a pas pu être effectué(e).`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  deleteAnimal(id: string) {
    const url = `${baseUrl}/${id}`;
    return this.httpClient.delete<Animal>(url);
  }
}


