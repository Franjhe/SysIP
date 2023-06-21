import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { State } from '../_models/states';

const baseUrl = environment.apiUrl + `/api/v1/states/`;

@Injectable({ providedIn: 'root' })
export class StateService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<State[]>(baseUrl)
    }

    // getById(id: string) {
    //     return this.http.get<State>(`${baseUrl}/${id}`);
    // }

    // create(params: any) {
    //     return this.http.post(baseUrl, params);
    // }

    // update(id: string, params: any) {
    //     return this.http.patch(`${baseUrl}/${id}`, params);
    // }

    // delete(id: string) {
    //     return this.http.delete(`${baseUrl}/${id}`);
    // }
}