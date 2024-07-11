import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { HomeComponent } from "./home.component";
import { ProfileComponent } from './sub-components/profile/profile.component';
import { UserManagementComponent } from "./sub-components/user-management/user-management.component";
import { HomeRoutingModule } from "./home-routing.module";
import { DashboardComponent } from './sub-components/dashboard/dashboard.component';
import { FaqComponent } from './sub-components/faq/faq.component';
import { HelpComponent } from './sub-components/help/help.component';
import { DataTablesModule } from "angular-datatables";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatFormFieldModule } from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule } from "@angular/material/button";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";


@NgModule({
    declarations : [
        HomeComponent,
        ProfileComponent,
        UserManagementComponent,
        DashboardComponent,
        FaqComponent,
        HelpComponent,
        UserManagementComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        DataTablesModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        FormsModule,
        SharedModule
      ]
})


export class HomeModule { }