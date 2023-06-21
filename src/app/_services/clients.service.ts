import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Clients } from '../_models/clients';

const baseUrl = environment.apiUrl + `/api/v1/news/news`;

@Injectable({ providedIn: 'root' })
export class ClientsService {
    constructor(private http: HttpClient) { }

    getAll(params: any) {
        return this.http.post<Clients[]>(baseUrl, params);
    }

    getById(id: string) {
        return this.http.get<Clients>(`${baseUrl}/${id}`);
    }

    create(params: any) {
        return this.http.post(baseUrl, params);
    }

    update(id: string, params: any) {
        return this.http.patch(`${baseUrl}/${id}`, params);
    }

    delete(id: string) {
        return this.http.delete(`${baseUrl}/${id}`);
    }
}