import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { User, UserResponse } from 'src/app/shared/models/user.interface';
import { catchError, map} from 'rxjs/operators';
import { UserService } from 'src/app/shared/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, protected userService: UserService) {}

  login(authData: User): Observable<UserResponse | any> {
    return this.http
      .post<UserResponse>(`${environment.API_URL}/auth/login`, authData)
      .pipe(
        map((res: UserResponse) => {
          console.log('res', res);
          // save token
        }),
      // catchError(error) => this.handlerError(error)
      );
  }
  logout(): void {}

  setCredentials(username, password){}

  private readToken(): void {}
  private saveToken(): void {}
  private handlerError(): void {}
}
