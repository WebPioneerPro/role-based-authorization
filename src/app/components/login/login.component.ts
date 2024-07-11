import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  invalidCheck: boolean = false;
  passwordVisibility: boolean = false;
  userdata: any;
  currentUserDetails: Object;
  isLoading: boolean = false;

  constructor(private toaster: ToastrService, private service: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required])
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.invalidCheck = false;
      this.isLoading = true
      this.service.getByCode('email', this.loginForm.value.email).subscribe(res => {
        this.userdata = res;
        this.isLoading = false;
        if (this.userdata && this.userdata.length > 0) {
          const user = this.userdata[0];
          if (user.password === this.loginForm.value.password) {
            if (user.status) {
              this.loginForm.reset();
              this.toaster.success(`Welcome ${user.name}`);
              sessionStorage.setItem('userId', user.id);
              sessionStorage.setItem('role', user.role);
              this.router.navigate(['home']);
            } else {
              this.toaster.warning("Please contact admin", "Inactive User");
              this.loginForm.reset();
            }
          } else {
            this.toaster.error("Invalid Username or Password");
          }
        } else {
          this.toaster.error("Please Sign Up", "User doesn't Exist");
        }
      }, err =>{
        let errorMessage: string;
        if (err.error instanceof ErrorEvent) {
          errorMessage = `Client-side error: ${err.error.message}`;
        }else{
          if (err.status === 0) {
            errorMessage = 'Network error occurred. Please check your internet connection or try again later.';
          } else {
            errorMessage = `Server-side error: Status ${err.status}, Message: ${err.error}`;
          }
        }
        this.toaster.error(errorMessage)
        this.isLoading = false;
      });
    } else {
      this.invalidCheck = true;
    }
  }  
}
