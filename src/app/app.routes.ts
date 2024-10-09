import { Routes } from '@angular/router';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { HomeComponent } from '@pages/home/home.component';
import { LoginComponent } from '@pages/login/login.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
];
