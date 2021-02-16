import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { VeterinaryCare } from '../classes/veterinary-care';
import { catchError } from 'rxjs/operators';

//const baseUrl = 'http://refuge-env.eba-kpfvmekf.eu-west-3.elasticbeanstalk.com/api';
const baseUrl = 'http://192.168.1.20:8080/refuge/api';

@Injectable({
  providedIn: 'root'
})
export class VeterinaryCareService {

  constructor(private httpClient: HttpClient) { }

  getVeterinaryCaresByAnimals(id: string): Observable<VeterinaryCare[]> {
    const url = `${baseUrl}/${id}/care`;

    return this.httpClient.get<VeterinaryCare[]>(url);
  }

  getVeterinaryCaresToDo(): Observable<VeterinaryCare[]> {
    const url = `${baseUrl}/care`;
    return this.httpClient.get<VeterinaryCare[]>(url);
  }

  getVeterinaryCareById(id: string): Observable<VeterinaryCare> {
    const url = `${baseUrl}/care/${id}`;
    return this.httpClient.get<VeterinaryCare>(url);
  }

  createVeterinaryCare(idAnimal: string, idVeterinary: string, veterinaryCare: object) {
    const url = `${baseUrl}/animal/${idAnimal}/veterinary/${idVeterinary}/care`;
    return this.httpClient.post(url, veterinaryCare).pipe(catchError(this.handleError));
  }

  updateVeterinaryCare(idAnimal: string, idVeterinary: string, veterinaryCare: object): Observable<object> {
    const url = `${baseUrl}/animal/${idAnimal}/veterinary/${idVeterinary}/care`;
    return this.httpClient.put(url, veterinaryCare).pipe(catchError(this.handleError));
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
    return this.httpClient.delete<VeterinaryCare>(url);
  }


}
