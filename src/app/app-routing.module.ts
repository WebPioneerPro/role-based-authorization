import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/home/sub-components/profile/profile.component';
import { UserManagementComponent } from './components/home/sub-components/user-management/user-management.component';
import { DashboardComponent } from './components/home/sub-components/dashboard/dashboard.component';
import { FaqComponent } from './components/home/sub-components/faq/faq.component';
import { HelpComponent } from './components/home/sub-components/help/help.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: RegistrationComponent},
  {path: 'home', component: HomeComponent, children: [
    {path: 'profile', component: ProfileComponent},
    {path: 'manage', component: UserManagementComponent, canActivate: [AdminGuard]},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'faq', component: FaqComponent},
    {path: 'help', component: HelpComponent},
    {path: '', redirectTo: 'dashboard', pathMatch: "full"},
    {path: '**', redirectTo: 'dashboard'}
  ], canActivate: [AuthGuard]},
  {path: '', redirectTo: 'login', pathMatch: "full"},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
