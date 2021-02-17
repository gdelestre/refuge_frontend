import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Veterinary } from '../classes/veterinary';

//const baseUrl = 'http://refuge-env.eba-kpfvmekf.eu-west-3.elasticbeanstalk.com/api/veterinary';
const baseUrl = 'https://192.168.1.20:8443/refuge/api/veterinary';

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
export class VeterinaryService {

  constructor(private httpClient: HttpClient) { }

  getAllVeterinaries(): Observable<Veterinary[]> {
    return this.httpClient.get<Veterinary[]>(baseUrl, httpOptions);
  }

  getOneVeterinary(id: string): Observable<Veterinary> {
    const url = `${baseUrl}/${id}`;
    return this.httpClient.get<Veterinary>(url, httpOptions);
  }

  createVeterinary(veterinary: object): Observable<object> {
    return this.httpClient.post(baseUrl, veterinary, httpOptions).pipe(catchError(this.handleErrorCreateUpdate));
  }

  updateVeterinary(veterinary: object): Observable<object> {
    return this.httpClient.put(baseUrl, veterinary, httpOptions).pipe(catchError(this.handleErrorCreateUpdate));
  }

  handleErrorCreateUpdate(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.status == 403) {
      errorMessage = `Ajout impossible! Ce numéro de téléphone est déjà utilisé.`;
    } else {
      errorMessage = `Erreur. L'ajout n'a pas pu être effectué.`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  deleteVeterinary(id: string) {
    const url = `${baseUrl}/${id}`;
    return this.httpClient.delete(url, httpOptions).pipe(catchError(this.handleErrorDelete));
  }

  handleErrorDelete(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.status == 403) {
      errorMessage = "Suppression impossible, ce vétérinaire a des soins à faire.\n Veuillez annuler les soins prévus pour pouvoir le supprimer.";
    } else {
      errorMessage = `Erreur. La suppression n'a pas eu lieu.`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
