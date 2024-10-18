import { Routes } from '@angular/router';
import { CategoriesListComponent } from '@pages/categories-list/categories-list.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { HomeComponent } from '@pages/home/home.component';
import { LandingpageComponent } from '@pages/landingpage/landingpage.component';
import { LoginComponent } from '@pages/login/login.component';
import { ProductsListComponent } from '@pages/products-list/products-list.component';
import { SignupComponent } from '@pages/signup/signup.component';
import { UsersListComponent } from '@pages/users-list/users-list.component';
import { AuthGuard } from 'src/guards/auth.guard';
import { NoAuthGuard } from 'src/guards/no-auth.guard';
import { RoleGuard } from 'src/guards/Role.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [NoAuthGuard] },
  {
    path: 'products-list',
    component: ProductsListComponent,
    canActivate: [RoleGuard],
    data: { validRoles: ['Admin', 'Employee'] },
  },
  {
    path: 'categories-list',
    component: CategoriesListComponent,
    canActivate: [RoleGuard],
    data: { validRoles: ['Admin', 'Employee'] },
  },
  {
    path: 'users-list',
    component: UsersListComponent,
    canActivate: [RoleGuard],
    data: { validRoles: ['Admin'] },
  },
  { path: 'landingpage', component: LandingpageComponent },
];
