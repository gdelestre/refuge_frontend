import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AdoptiveFamily } from '../classes/adoptive-family';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

//const baseUrl = 'http://refuge-env.eba-kpfvmekf.eu-west-3.elasticbeanstalk.com/api/adoptive';
const baseUrl = 'https://192.168.1.20:8443/refuge/api/adoptive';

@Injectable({
  providedIn: 'root'
})
export class AdoptiveFamilyService {

  constructor(private httpClient: HttpClient) { }

  getAllAdoptivesFamilies(): Observable<AdoptiveFamily[]> {
    return this.httpClient.get<AdoptiveFamily[]>(baseUrl);
  }

  getOneAdoptiveFamily(id: string): Observable<AdoptiveFamily> {
    const url = `${baseUrl}/${id}`;
    return this.httpClient.get<AdoptiveFamily>(url);
  }

  getAdoptiveFamilyByPhoneNumber(phoneNumber: string): Observable<AdoptiveFamily> {
    const url = `${baseUrl}/phone/${phoneNumber}`;
    return this.httpClient.get<AdoptiveFamily>(url);
  }

  createAdoptiveFamily(adoptiveFamily: object): Observable<object> {
    return this.httpClient.post(baseUrl, adoptiveFamily).pipe(catchError(this.handleError));
  }

  updateAdoptiveFamily(adoptiveFamily: object): Observable<object> {
    return this.httpClient.put(baseUrl, adoptiveFamily).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.status == 403) {
      errorMessage = `Ajout ou modification impossible! Ce numéro de téléphone est déjà utilisé.`;
    } else {
      errorMessage = `Erreur. L'ajout n'a pas pu être effectué.`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}