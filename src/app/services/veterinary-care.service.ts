import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { VeterinaryCare } from '../classes/veterinary-care';
import { catchError } from 'rxjs/operators';

//const baseUrl = 'http://refuge-env.eba-kpfvmekf.eu-west-3.elasticbeanstalk.com/api';
const baseUrl = 'https://192.168.1.20:8443/refuge/api';

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
export class VeterinaryCareService {

  constructor(private httpClient: HttpClient) { }

  getVeterinaryCaresByAnimals(id: string): Observable<VeterinaryCare[]> {
    const url = `${baseUrl}/${id}/care`;

    return this.httpClient.get<VeterinaryCare[]>(url, httpOptions);
  }

  getVeterinaryCaresToDo(): Observable<VeterinaryCare[]> {
    const url = `${baseUrl}/care`;
    return this.httpClient.get<VeterinaryCare[]>(url, httpOptions);
  }

  getVeterinaryCareById(id: string): Observable<VeterinaryCare> {
    const url = `${baseUrl}/care/${id}`;
    return this.httpClient.get<VeterinaryCare>(url, httpOptions);
  }

  createVeterinaryCare(idAnimal: string, idVeterinary: string, veterinaryCare: object) {
    const url = `${baseUrl}/animal/${idAnimal}/veterinary/${idVeterinary}/care`;
    return this.httpClient.post(url, veterinaryCare, httpOptions).pipe(catchError(this.handleError));
  }

  updateVeterinaryCare(idAnimal: string, idVeterinary: string, veterinaryCare: object): Observable<object> {
    const url = `${baseUrl}/animal/${idAnimal}/veterinary/${idVeterinary}/care`;
    return this.httpClient.put(url, veterinaryCare, httpOptions).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.status == 403) {
      errorMessage = `Ajout impossible! Ce numéro de téléphone est déjà utilisé.`;
    } else {
      errorMessage = `Erreur. L'ajout ou la modification n'a pas pu être effectué(e).`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  deleteCare(id: string) {
    const url = `${baseUrl}/care/${id}`;
    return this.httpClient.delete<VeterinaryCare>(url, httpOptions);
  }


}
