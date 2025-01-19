import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import ApiResponse  from '../models/api-response';

var url = environment.api + '/user';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private http: HttpClient) { }

    login(data: any): Observable<ApiResponse<any>> {
        let query = `${url}/login/authenticate/`;
        return this.http.post<ApiResponse<any>>(query, data);
    }

}