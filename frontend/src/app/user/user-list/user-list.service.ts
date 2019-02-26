import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class UserListService {

    private url = 'http://localhost:8000/';

    constructor(private http: HttpClient) { }

    listUsers() {
        return this.http.get(this.url.concat('user/'));
    }
    listInstitutions() {
        return this.http.get(this.url.concat('institutions/'));
    }
}
