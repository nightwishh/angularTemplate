export class LoginCredentials {
 public email:string;
 public password:string;
 constructor() {

 }
}
export class Registration extends LoginCredentials {
  public fullName:string;
  public phone:string = "";
  public confirmPassword:string;
  public tin:string;
  public type:UserTypes;
}
export enum UserTypes {
  Freelancer,
  Organization
}
export class Profile {
  public tin:string;
}
export class Passwords {
  public oldPassword:string;
  public newPassword:string;
  public confirmNewPassword:string;
}