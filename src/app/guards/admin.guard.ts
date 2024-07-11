import { CanActivate, Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
   constructor(private authService: AuthService, private router: Router, private toaster:ToastrService){}

   canActivate():boolean{
     if(this.authService.isAdmin()){
      return true
     }else {
      this.router.navigate(['/home']);
      this.toaster.error("Admins Only. Contact Admin for Help",'Unauthorized Access')
      return false;
     }
   }
}

