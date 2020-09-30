import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { VeterinaryCare } from '../classes/veterinary-care';
import { Veterinary } from '../classes/veterinary';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VeterinaryCareService {

  private baseUrl = 'http://localhost:8080/api/';

  constructor(private httpClient: HttpClient) { }

  getVeterinaryCaresByAnimals(id:string): Observable<VeterinaryCare[]> {
    const url = `${this.baseUrl}/${id}/care`;

    return this.httpClient.get<VeterinaryCare[]>(url);
  }

  getAllVeterinaries(): Observable<Veterinary[]>{
    const url = `${this.baseUrl}/veterinary/`;
    return this.httpClient.get<Veterinary[]>(url);
  }

  getOneVeterinary(id: string): Observable<Veterinary>{
    const url = `${this.baseUrl}/veterinary/${id}`;
    return this.httpClient.get<Veterinary>(url);
  }


  createVeterinary(veterinary: object): Observable<object> {
    const url = `${this.baseUrl}/veterinary/`;

    return this.httpClient.post(url, veterinary).pipe(catchError(this.handleError));
  }

  createVeterinaryCare(idAnimal: string, idVeterinary: string, veterinaryCare: object){
    const url = `${this.baseUrl}/animal/${idAnimal}/veterinary/${idVeterinary}/care`;
    return this.httpClient.post(url, veterinaryCare).pipe(catchError(this.handleError));
  }


  handleError(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.status == 403) {
      errorMessage = `Ajout impossible! Ce numéro de téléphone est déjà utilisé.`;
    }else{
      errorMessage = `Erreur. L'ajout n'a pas pu être effectué.`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
