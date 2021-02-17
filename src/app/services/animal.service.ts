import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Animal } from '../classes/animal';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

//const baseUrl = 'http://refuge-env.eba-kpfvmekf.eu-west-3.elasticbeanstalk.com/api/animal';
const baseUrl = 'https://192.168.1.20:8443/refuge/api/animal';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
    'mon-entete-personnalise': 'maValeur'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor(private httpClient: HttpClient) { }

  getAllAnimals(): Observable<Animal[]> {
    return this.httpClient.get<Animal[]>(baseUrl, httpOptions);
  }

  getAnimalsBySpecies(species: string): Observable<Animal[]> {
    const url = `${baseUrl}/species/${species}`;
    return this.httpClient.get<Animal[]>(url, httpOptions);
  }

  getOneAnimal(id: string): Observable<Animal> {
    const url = `${baseUrl}/${id}`;
    return this.httpClient.get<Animal>(url, httpOptions);
  }

  getAnimalsInHostFamily(): Observable<Animal[]> {
    const url = `${baseUrl}/host`;
    return this.httpClient.get<Animal[]>(url, httpOptions);
  }

  getAdoptedAnimals(): Observable<Animal[]> {
    const url = `${baseUrl}/adoptive`;
    return this.httpClient.get<Animal[]>(url, httpOptions);
  }

  createAnimal(animal: object): Observable<object> {
    return this.httpClient.post(baseUrl, animal, httpOptions).pipe(catchError(this.handleError));
  }

  updateAnimal(animal: object): Observable<object> {
    return this.httpClient.put(baseUrl, animal, httpOptions).pipe(catchError(this.handleError));
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
    return this.httpClient.delete<Animal>(url, httpOptions);
  }
}


