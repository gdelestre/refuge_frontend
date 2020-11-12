import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AdoptiveFamily } from '../classes/adoptive-family';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdoptiveFamilyService {
  private baseUrl = 'http://localhost:8080/api/adoptive';

  constructor(private httpClient: HttpClient) { }

  getAllAdoptivesFamilies(): Observable<AdoptiveFamily[]> {
    return this.httpClient.get<AdoptiveFamily[]>(this.baseUrl);
  }

  getOneAdoptiveFamily(id: string): Observable<AdoptiveFamily>{
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<AdoptiveFamily>(url);
  }

  getAdoptiveFamilyByPhoneNumber(phoneNumber: string): Observable<AdoptiveFamily>{
    const url = `${this.baseUrl}/phone/${phoneNumber}`;
    return this.httpClient.get<AdoptiveFamily>(url);
  }

  createAdoptiveFamily(adoptiveFamily: object): Observable<object> {
    return this.httpClient.post(this.baseUrl, adoptiveFamily).pipe(catchError(this.handleError));
  }

  updateAdoptiveFamily(adoptiveFamily: object): Observable<object> {
    return this.httpClient.put(this.baseUrl, adoptiveFamily).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.status == 403) {
      errorMessage = `Ajout ou modification impossible! Ce numéro de téléphone est déjà utilisé.`;
    }else{
      errorMessage = `Erreur. L'ajout n'a pas pu être effectué.`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}