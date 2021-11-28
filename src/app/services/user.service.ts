import { Injectable } from '@angular/core';
import { User } from './../interfaces/userInterface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${environment.url}/users`);
  }

  editUserDetails(userData: User, id: number): Observable<any>{
    return this.http.put<any>(`${environment.url}/users/${id}`, userData);
  }

  deleteUser(id: number): Observable<any>{
    return this.http.delete<any>(`${environment.url}/users/${id}`);
  }
}
