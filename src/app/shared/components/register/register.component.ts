import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  dataLoading = false;
  user: User;

  constructor(protected userService: UserService, private router: Router) {}
  // Register Form Controls
  firstNameFormControl = new FormControl('', [Validators.required]);
  lastNameFormControl = new FormControl('', [Validators.required]);
  userNameFormControl = new FormControl('', [Validators.required]);
  pwdFormControl = new FormControl('', [Validators.required]);

  ngOnInit(): void {}

  /**
   * Save User
   */
  saveUser() {
    const uuidv4 = require('uuid/v4');
    this.user = {
      id: uuidv4(),
      firstname: this.firstNameFormControl.value,
      lastname: this.lastNameFormControl.value,
      username: this.userNameFormControl.value,
      password: this.pwdFormControl.value,
    };
  }

  /**
   * Register form
   */
  register() {
    this.dataLoading = true;
    this.saveUser();
    this.userService
      .create(this.user)
      .then((response) => {
        if (response.success) {
          alert('Registration successful');
          this.router.navigate(['/login']);
        } else {
          alert(response.message);
        }
        this.dataLoading = false;
      });
  }
}
