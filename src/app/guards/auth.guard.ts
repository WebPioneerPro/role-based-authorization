import { CanActivate, Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
   constructor(private authService: AuthService, private router: Router, private toaster:ToastrService){}

   canActivate():boolean{
     if(this.authService.isLoggedIn()){
      return true
     }else {
      this.router.navigate(['/login']);
      this.toaster.error("Please log in or contact admin",'Unauthorized Access')
      return false;
     }
   }
}
