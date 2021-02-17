import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { HostFamily } from '../classes/host-family';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

//const baseUrl = 'http://refuge-env.eba-kpfvmekf.eu-west-3.elasticbeanstalk.com/api/host';
const baseUrl = 'https://192.168.1.20:8443/refuge/api/host';

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
export class HostFamilyService {

  constructor(private httpClient: HttpClient) { }

  getHostFamilyByPhoneNumber(phoneNumber: string): Observable<HostFamily> {
    const url = `${baseUrl}/phone/${phoneNumber}`;
    return this.httpClient.get<HostFamily>(url, httpOptions);
  }

  getAllHostFreeFamilies(): Observable<HostFamily[]> {
    const url = `${baseUrl}/free`;
    return this.httpClient.get<HostFamily[]>(url, httpOptions);
  }

  getAllHostFullFamilies(): Observable<HostFamily[]> {
    const url = `${baseUrl}/full`;
    return this.httpClient.get<HostFamily[]>(url, httpOptions);
  }

  getFamilyById(id: string): Observable<HostFamily> {
    const url = `${baseUrl}/${id}`;
    return this.httpClient.get<HostFamily>(url, httpOptions);
  }

  createHostFamily(hostFamily: object): Observable<object> {
    return this.httpClient.post(baseUrl, hostFamily, httpOptions).pipe(catchError(this.handleError));
  }

  updateHostFamily(hostFamily: object): Observable<object> {
    return this.httpClient.put(baseUrl, hostFamily, httpOptions).pipe(catchError(this.handleError));
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

  deleteFamily(id: string) {
    const url = `${baseUrl}/${id}`;
    return this.httpClient.delete(url, httpOptions).pipe(catchError(this.handleErrorDelete));
  }

  handleErrorDelete(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.status == 403) {
      errorMessage = "Suppression impossible, cette famille accueille encore des animaux.";
    } else {
      errorMessage = `Erreur. La suppression n'a pas eu lieu.`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }


}
