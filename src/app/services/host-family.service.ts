import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HostFamily } from '../classes/host-family';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HostFamilyService {

  private baseUrl = 'http://localhost:8080/api/host';

  constructor(private httpClient: HttpClient) { }


  getAllHostFamily(): Observable<HostFamily[]> {
    return this.httpClient.get<HostFamily[]>(this.baseUrl);
  }

  getFamilyById(id: string): Observable<HostFamily> {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<HostFamily>(url);
  }

  createHostFamily(hostFamily: object): Observable<object> {
    return this.httpClient.post(this.baseUrl, hostFamily).pipe(catchError(this.handleError));
  }

  updateHostFamily(hostFamily: object): Observable<object> {
    return this.httpClient.put(this.baseUrl, hostFamily).pipe(catchError(this.handleError));
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
