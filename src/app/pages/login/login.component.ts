import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { User } from '../../shared/models/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  dataLoading = false;
  user: User;
  formGroup: FormGroup;
  constructor(protected authService: AuthService, protected router: Router) {}

  // Login Form
  userFormControl = new FormControl('', [Validators.required]);
  passwordFormControl = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.createFormGroup();
  }

  createFormGroup(): void {
    this.formGroup = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  /**
   * Save User
   */
  saveUser(): void {
    const uuidv4 = require('uuid/v4');
    this.user = {
      username: this.formGroup.controls.userName.value,
      password: this.formGroup.controls.password.value,
    };
  }

  login(): void {
    this.dataLoading = true;
    this.saveUser();
    this.authService
      .login(this.user)
      .toPromise()
      .then((response) => {
        if (response.success) {
          this.authService.setCredentials(this.user.username, this.user.password);
          this.router.navigate(['/ship-list']);
        } else {
          alert(response.message);
          this.dataLoading = false;
        }
      });
  }
}
