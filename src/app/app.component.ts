import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <form class= "form">
      <label for="password">Password:</label>
      <input type="password" id="password" [(ngModel)]="password" name="password" (input)="updatePasswordInform(); updatePasswordStrength()">
      <div class="password-strength-indicators">
        <div [ngClass]="{'indicator-strong': passwordStrength === 'Strong', 'indicator-medium': passwordStrength === 'Medium', 'indicator-small': passwordStrength === 'Small' || passwordStrength === 'Easy', 'indicator-gray': !password}"></div>
        <div [ngClass]="{'indicator-strong': passwordStrength === 'Strong', 'indicator-medium': passwordStrength === 'Medium', 'indicator-small': passwordStrength === 'Small', 'indicator-gray': !password}"></div>
        <div [ngClass]="{'indicator-strong': passwordStrength === 'Strong','indicator-small': passwordStrength === 'Small', 'indicator-gray': !password}"></div>
      </div>
    </form>
  `,
  styles: [`
      .form {
        margin: 50px 0 10px 0;
      }
      label {
        padding-right: 8px;
      }
      .password-strength-indicators {
        margin: 6px 0 0 74px;
        display: flex;
      }
      .indicator-strong {
        width: 30px;
        height: 10px;
        background-color: #228B22;
        margin-right: 5px;
      }
      .indicator-medium {
        width: 30px;
        height: 10px;
        background-color: #FFFF00;
        margin-right: 5px;
      }
      .indicator-small {
        width: 30px;
        height: 10px;
        background-color: #FF0000;
        margin-right: 5px;
      }
      .indicator-gray {
        width: 30px;
        height: 10px;
        background-color: #C0C0C0;
        margin-right: 5px;
      }
  `],
}) 

export class AppComponent {
  password: string = '';
  passwordStrength: string = '';

  hasLetter: boolean = false;
  hasSymbol: boolean = false;
  hasDigit: boolean = false;

  updatePasswordInform() {
    this.hasLetter = /[a-zA-Zа-яА-Я]/.test(this.password);
    this.hasSymbol = /[=!@#\$%^&*()_+{}\[\]:;<>,.?~\\|/-]/.test(this.password);
    this.hasDigit = /\d/.test(this.password);
  }

  updatePasswordStrength() {
    if (!this.password) {
        this.passwordStrength = '';
      } else if (this.password.length < 8) {
        this.passwordStrength = 'Small';
      } else if (this.hasDigit && this.hasLetter && this.hasSymbol) {
        this.passwordStrength = 'Strong';
      } else if (this.hasLetter && this.hasSymbol || this.hasDigit && this.hasLetter || this.hasDigit && this.hasSymbol) {
        this.passwordStrength = 'Medium';
      } else if (this.hasDigit || this.hasLetter || this.hasSymbol) {
        this.passwordStrength = 'Easy';
      }
  }
}
