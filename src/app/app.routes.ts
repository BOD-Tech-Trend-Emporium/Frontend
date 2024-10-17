import { Routes } from '@angular/router';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { HomeComponent } from '@pages/home/home.component';
import { LandingpageComponent } from '@pages/landingpage/landingpage.component';
import { LoginComponent } from '@pages/login/login.component';
import { ProductDetailComponent } from '@pages/product-detail/product-detail.component';
import { ProductsListComponent } from '@pages/products-list/products-list.component';
import { SignupComponent } from '@pages/signup/signup.component';
import { UsersListComponent } from '@pages/users-list/users-list.component';
import { AuthGuard } from 'src/guards/auth.guard';
import { NoAuthGuard } from 'src/guards/no-auth.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [NoAuthGuard] },
  { path: 'products-list', component: ProductsListComponent },
  { path: 'users-list', component: UsersListComponent },
  { path: 'landing-page', component: LandingpageComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent}
];
