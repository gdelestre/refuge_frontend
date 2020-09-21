import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HostFamily } from '../classes/host-family';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HostFamilyService {

  private baseUrl = 'http://localhost:8080/api/host';

  constructor(private httpClient: HttpClient) { }


  getAllHostFamily(): Observable<HostFamily[]> {
    return this.httpClient.get<HostFamily[]>(this.baseUrl);
  }
  

}
