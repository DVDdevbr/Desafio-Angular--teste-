import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { authGuard } from './guard/auth-guard';

export const routes: Routes = [
    { path: "login", component: Login },
     { path: "home", component: Home, canActivate:[authGuard] },
    { path: "dashboard", component: Dashboard, canActivate:[authGuard] },
    { path:"", redirectTo: "login", pathMatch: "full" }
];
