import { Routes } from '@angular/router';
import { CategoriesListComponent } from '@pages/categories-list/categories-list.component';
import { CreateCategoryComponent } from '@pages/create-category/create-category.component';
import { CreateEmployeeComponent } from '@pages/create-employee/create-employee.component';
import { CreateProductComponent } from '@pages/create-product/create-product.component';
import { DashboardComponent } from '@pages/dashboard/dashboard.component';
import { HomeComponent } from '@pages/home/home.component';
import { LandingpageComponent } from '@pages/landingpage/landingpage.component';
import { LoginComponent } from '@pages/login/login.component';
import { LogoutComponent } from '@pages/logout/logout.component';
import { ProductDetailComponent } from '@pages/product-detail/product-detail.component';
import { ProductsListComponent } from '@pages/products-list/products-list.component';
import { RecoverPasswordComponent } from '@pages/recover-password/recover-password.component';
import { SignupComponent } from '@pages/signup/signup.component';
import { UsersListComponent } from '@pages/users-list/users-list.component';
import { AuthGuard } from 'src/guards/auth.guard';
import { NoAuthGuard } from 'src/guards/no-auth.guard';

export const routes: Routes = [
  { path: '', component: LandingpageComponent },
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [NoAuthGuard] },
  {
    path: 'recover-password',
    component: RecoverPasswordComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { validRoles: ['Admin', 'Employee'] },
  },
  {
    path: 'products-list',
    component: ProductsListComponent,
    canActivate: [AuthGuard],
    data: { validRoles: ['Admin', 'Employee'] },
  },
  {
    path: 'categories-list',
    component: CategoriesListComponent,
    canActivate: [AuthGuard],
    data: { validRoles: ['Admin', 'Employee'] },
  },
  {
    path: 'users-list',
    component: UsersListComponent,
    canActivate: [AuthGuard],
    data: { validRoles: ['Admin'] },
  },
  { path: 'logout', component: LogoutComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'create-category', component: CreateCategoryComponent, canActivate: [AuthGuard], data: {validRoles: ['Admin', 'Employee']}},
  { path: 'create-product', component: CreateProductComponent, canActivate: [AuthGuard], data: {validRoles: ['Admin', 'Employee']}},
  { path: 'create-employee', component: CreateEmployeeComponent, canActivate: [AuthGuard], data: {validRoles: ['Admin']}}
];
