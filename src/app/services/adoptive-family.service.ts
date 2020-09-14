import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdoptiveFamily } from '../classes/adoptive-family';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdoptiveFamilyService {
  private baseUrl = 'http://localhost:8080/api/adoptive';

  constructor(private httpClient: HttpClient) { }


  getAllHostFamily(): Observable<AdoptiveFamily[]> {
    return this.httpClient.get<AdoptiveFamily[]>(this.baseUrl);
  }
}