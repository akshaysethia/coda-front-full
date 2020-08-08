import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user = {
    email: '',
    password: '',
  };
  errMsg: string = null;
  loader: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit(): void {
    this.loader = true;
    this.authService.loginUser(this.user).subscribe(
      (res) => {
        if (res.success) {
          this.loader = false;
          this.router.navigate(['/home']);
        } else {
          this.loader = false;
          this.errMsg = <string>res.message;
          setTimeout(() => {
            this.errMsg = null;
          }, 3000);
        }
      },
      (err) => {
        this.errMsg = <any>err;
      }
    );
  }
}
