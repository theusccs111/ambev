import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import ApiResponse from '../models/api-response';

var url = environment.api + '/sale';

@Injectable({
    providedIn: 'root'
})
export class SaleService {
    constructor(private http: HttpClient) { }

    getList(data: any): Observable<ApiResponse<any>> {
        let query = `${url}/list-all/`;
        return this.http.post<ApiResponse<any>>(query, data);
    }


    get(data: any): Observable<any> {
        let query = `${url}/get/`;
        return this.http.post<any>(`${query}`, data);
    }

    create(data: any): Observable<any> {
        let query = `${url}/add/`;
        return this.http.post<any>(`${query}`, data);
    }

    delete(data: any): Observable<any> {
        let query = `${url}/delete/`;
        return this.http.post<any>(`${query}`, data);
    }

}