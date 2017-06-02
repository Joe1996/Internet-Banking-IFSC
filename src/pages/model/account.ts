export class Account {

  public _id;
  public number = '';
  public password = '';
  public name = '';
  public lastLogin = new Date().toLocaleString();
  public balance = '';

  constructor() {}
}
