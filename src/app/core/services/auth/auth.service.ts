import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {LoginRequest} from "../../models/login-request.model";
import {User} from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private api = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }
  login(request: LoginRequest): Observable<User> {
    return this.http.get<User[]>(`${this.api}?email=${request.email}&password=${request.password}`)
      .pipe(
        map(users => {
          if (users.length > 0) {
            return users[0];
          } else {
            throw new Error('Email ou mot de passe incorrect');
          }
        })
      );
  }

  register(user: FormData | User): Observable<User> {
    return this.http.post<User>(this.api, user);
  }




}
