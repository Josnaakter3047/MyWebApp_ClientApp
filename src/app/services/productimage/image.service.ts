import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from '../../models/productimage/image';
import { ImagePath } from '../../models/productimage/image-path';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

    constructor(private http: HttpClient) { }
    getProductImages(): Observable<Image[]> {
      return this.http.get<Image[]>(`http://localhost:16669/api/ProductImage`);
    }

    getProductImageById(id: number): Observable<Image> {
        return this.http.get<Image>(`http://localhost:16669/api/ProductImage/${id}`);
    }
    deleteProductImage(id: number): Observable<any> {
        return this.http.delete<Image>(`http://localhost:16669/api/ProductImage/${id}`)
    }
    insertProductImage(data: Image): Observable<Image> {
        return this.http.post<Image>(`http://localhost:16669/api/ProductImage`, data);
    }
    updateProductImage(data: Image): Observable<any> {
        return this.http.put(`http://localhost:16669/api/ProductImage/${data.id}`, data);
    }

    uploadImage(id: number, f: File): Observable<ImagePath> {
        const formData = new FormData();
        formData.append('file', f);
        return this.http.post<ImagePath>(`http://localhost:16669/api/ProductImage/Uploads/${id}`, formData);
    }
}
