import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';

import { User, UserResponse } from 'src/app/shared/models/user.interface';
import { catchError, map } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, protected userService: UserService) {}

  login(authData: User): Observable<UserResponse | any> {
    return this.http
      .post<UserResponse>(`${environment.API_URL}/login`, authData)
      .pipe(
        map((res: UserResponse) => {
          console.log('res', res);
          // save token
        }),
        catchError((error) => throwError(error))
      );
  }

  setCredentials(username: string, password: string){
    // TODO:
  }

  logout(): void {
    // TODO:
  }
}
