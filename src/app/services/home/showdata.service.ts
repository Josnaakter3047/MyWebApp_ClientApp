import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alldata } from '../../models/alldata/alldata';

@Injectable({
  providedIn: 'root'
})
export class ShowdataService {

  constructor(private http: HttpClient) { }
  getAllData(): Observable<Alldata[]> {
    return this.http.get<Alldata[]>(`http://localhost:16669/api/Home`);
  }
}
