import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Veterinary } from '../classes/veterinary';

@Injectable({
  providedIn: 'root'
})
export class VeterinaryService {

  private baseUrl = 'http://refuge-env.eba-kpfvmekf.eu-west-3.elasticbeanstalk.com/api/veterinary';
  //private baseUrl = 'http://localhost:8080/api/veterinary';

  constructor(private httpClient: HttpClient) { }

  getAllVeterinaries(): Observable<Veterinary[]>{
    return this.httpClient.get<Veterinary[]>(this.baseUrl);
  }

  getOneVeterinary(id: string): Observable<Veterinary>{
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<Veterinary>(url);
  }

  createVeterinary(veterinary: object): Observable<object> {
    return this.httpClient.post(this.baseUrl, veterinary).pipe(catchError(this.handleErrorCreateUpdate));
  }

  updateVeterinary(veterinary: object): Observable<object> {
    return this.httpClient.put(this.baseUrl, veterinary).pipe(catchError(this.handleErrorCreateUpdate));
  }

  handleErrorCreateUpdate(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.status == 403) {
      errorMessage = `Ajout impossible! Ce numéro de téléphone est déjà utilisé.`;
    }else{
      errorMessage = `Erreur. L'ajout n'a pas pu être effectué.`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  deleteVeterinary(id:string){
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.delete(url).pipe(catchError(this.handleErrorDelete));
  }

  handleErrorDelete(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.status == 403) {
      errorMessage = "Suppression impossible, ce vétérinaire a des soins à faire.\n Veuillez annuler les soins prévus pour pouvoir le supprimer.";
    }else{
      errorMessage = `Erreur. La suppression n'a pas eu lieu.`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
