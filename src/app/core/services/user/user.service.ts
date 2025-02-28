import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<any>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();

  private api = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {
  }

  getUsers() : Observable<User[]>{
    return this.http.get<User[]>(this.api);
  }
  createUser(request : User) : Observable<User> {
    return this.http.post<User>(this.api, request);
  }
  getUserById(userId: string | number): Observable<User> {
    return this.http.get<User>(`${this.api}/${userId}`);
  }
  updateUser(id: string | number, user: User): Observable<User> {
    return this.http.put<User>(`${this.api}/${id}`, user);
  }

  setUser(user: User) {
    this.userSubject.next(user);
  }
  deleteUser(userId: string | number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${userId}`);
  }


}
