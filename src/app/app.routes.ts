import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddScrapComponent } from './components/add-scrap/add-scrap.component';
import { ScrapListComponent } from './components/scrap-list/scrap-list.component';
import { SearchScrapComponent } from './components/search-scrap/search-scrap.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add', component: AddScrapComponent },
  { path: 'list', component: ScrapListComponent },
  { path: 'search', component: SearchScrapComponent }
];