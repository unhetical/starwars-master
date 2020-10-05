import { Injectable } from '@angular/core';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getAll(): any {
    const promise = new Promise((resolve, reject) => {
      this.getUsers()
        .toPromise()
        .then(
          (res: any) => {
            // Success
            resolve(res);
          },
          (err) => {
            // Error
            reject(err);
          }
        );
    });
    return promise;
  }

  getById(id: string): User | null {
    const users = this.getUsers();
    const user = users.find((usr) => usr.id === id);
    return user.length ? user : null;
  }

  getByUsername(username: string): User | null {
    const users = this.getUsers();
    const user = users.find((usr) => usr.username === username);
    return user ? user : null;
  }

  create(user: User): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      const usr = this.getByUsername(user.username);
      if (usr !== null && usr.username !== '') {
        alert('Username "' + user.username + '" is already taken');
        reject('error');
      } else {
        const users = this.getUsers();
        // save to local storage
        users.push(user);
        this.setUsers(users);
        resolve(true);
      }
    });
    return promise;
  }

  // create2(user: User): Observable<any> {
  //   const usr = this.getByUsername(user.username);
  //   if (usr !== null && usr.username !== '') {
  //     alert('Username "' + user.username + '" is already taken');
  //   } else {
  //     const users = this.getUsers();
  //     // save to local storage
  //     users.push(user);
  //     this.setUsers(users);
  //     return users;
  //   }
  // }

  update(user: User): void {
    const users = this.getUsers();
    users.forEach((usr) => {
      if (usr.id === user.id) {
        usr = user;
      }
    });
    this.setUsers(users);
  }

  delete(id: string): void {
    if (id) {
      const users = this.getUsers();
      users.filter((usr) => !id.includes(usr.id));
      this.setUsers(users);
    }
  }

  private getUsers(): any {
    if (!localStorage.users) {
      localStorage.users = JSON.stringify([]);
    }
    return JSON.parse(localStorage.users);
  }

  private setUsers(users: any): void {
    localStorage.users = JSON.stringify(users);
  }
}
