import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.interface';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  dataLoading = false;
  user: User;
  formGroup: FormGroup;

  constructor(protected userService: UserService, private router: Router) {}
  // Register Form Controls
  ngOnInit(): void {
    this.createFormGroup();
  }

  createFormGroup() {
    this.formGroup = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  /**
   * Save User
   */
  saveUser() {
    const uuidv4 = require('uuid/v4');
    this.user = {
      id: uuidv4(),
      firstname: this.formGroup.controls.firstName.value,
      lastname: this.formGroup.controls.lastName.value,
      username: this.formGroup.controls.userName.value,
      password: this.formGroup.controls.password.value,
    };
  }

  /**
   * Register form
   */
  register() {
    this.dataLoading = true;
    this.saveUser();
    this.userService.create(this.user).then((response) => {
      if (response.success) {
        alert('Registration successful');
        this.router.navigate(['/login']);
      } else {
        alert(response.message);
      }
      console.log(this.userService.getAll());
      this.dataLoading = false;
    });
    return false;
  }

  // register2() {
  //   this.dataLoading = true;
  //   this.saveUser();
  //   this.userService.create2(this.user).pipe(
  //     map((res) => {
  //       if (res) {
  //         alert('Registration succesful');
  //         this.router.navigate(['/login']);
  //       }
  //     }),
  //     catchError((err) => {
  //       alert(err);
  //       return throwError(err);
  //     }),
  //     finalize(() => {
  //       this.dataLoading = false;
  //     })
  //   ).subscribe();
  // }
}
