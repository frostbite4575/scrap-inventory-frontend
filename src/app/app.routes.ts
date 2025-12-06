import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddScrapComponent } from './components/add-scrap/add-scrap.component';
import { ScrapListComponent } from './components/scrap-list/scrap-list.component';
import { SearchScrapComponent } from './components/search-scrap/search-scrap.component';
import { SawDashboardComponent } from './components/saw-dashboard/saw-dashboard.component';
import { AddSawMaterialComponent } from './components/add-saw-material/add-saw-material.component';
import { SawMaterialListComponent } from './components/saw-material-list/saw-material-list.component';
import { SearchSawMaterialComponent } from './components/search-saw-material/search-saw-material.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent, canActivate: [authGuard] },

  // Plate/Plasma Table Routes
  { path: 'plasma/dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'plasma/add', component: AddScrapComponent, canActivate: [authGuard] },
  { path: 'plasma/list', component: ScrapListComponent, canActivate: [authGuard] },
  { path: 'plasma/search', component: SearchScrapComponent, canActivate: [authGuard] },

  // Saw Materials Routes
  { path: 'saw/dashboard', component: SawDashboardComponent, canActivate: [authGuard] },
  { path: 'saw/add', component: AddSawMaterialComponent, canActivate: [authGuard] },
  { path: 'saw/list', component: SawMaterialListComponent, canActivate: [authGuard] },
  { path: 'saw/search', component: SearchSawMaterialComponent, canActivate: [authGuard] },

  // Redirect unknown routes to home
  { path: '**', redirectTo: '' }
];