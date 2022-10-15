import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from '../../models/product/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:16669/api/Products`);
  }
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:16669/api/Products/${id}`);
  }
  insertProduct(data: Product): Observable<Product> {
    return this.http.post<Product>(`http://localhost:16669/api/Products`, data);
  }
  updateProduct(data: Product): Observable<any> {
    return this.http.put(`http://localhost:16669/api/Products/${data.id}`, data);
  }
  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`http://localhost:16669/api/Products/${id}`);
  }
  
}
