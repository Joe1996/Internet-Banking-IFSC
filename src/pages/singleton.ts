import { Injectable } from '@angular/core';

@Injectable()
export class Singleton {

  private user;

  constructor() {
    this.user = '';
  }

  setUserLogged(user) {
    this.user = user;
  }

  getUserLogged() {
    return this.user;
  }

}
