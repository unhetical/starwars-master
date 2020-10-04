import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  dataLoading = false;
  constructor(protected authService: AuthService, protected router: Router) {}

  // Login Form
  userFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);

  ngOnInit(): void {}

  login(user: User) {
    this.dataLoading = true;
    this.authService
      .login(user)
      .toPromise()
      .then((response) => {
        if (response.success) {
          this.authService.setCredentials(user.username, user.password);
          this.router.navigate(['/shipList']);
        } else {
          alert(response.message);
          this.dataLoading = false;
        }
      });
  }
}
