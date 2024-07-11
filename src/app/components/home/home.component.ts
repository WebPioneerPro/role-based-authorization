import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  toggleSidebar:boolean = false
  isShow: boolean;
  topPosToStartShowing = 100;
  userRole : string;
  userId : string;
  currentUserData : any;

  constructor(private router: Router, private service: AuthService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.userRole = sessionStorage.getItem('role')
    this.userId = sessionStorage.getItem('userId')
    this.service.getByCode('id', this.userId).subscribe(res => {
      this.currentUserData = res[0]
    })
  }

  @HostListener('window:scroll')
  checkScroll() {
    const scrollPosition = document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  ontoggleSidebar() {
    this.toggleSidebar = !this.toggleSidebar
  } 

  onclickToggleSidebar(){
    if(this.toggleSidebar == true){
      this.toggleSidebar = !this.toggleSidebar
    }
  }

  onSignOut(){
    sessionStorage.removeItem('userId')
    sessionStorage.removeItem('role')
    this.router.navigate(['/login'])
    this.toastr.success('Signed out successfully. See you soon!')
  }

}
