import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddScrapComponent } from './components/add-scrap/add-scrap.component';
import { ScrapListComponent } from './components/scrap-list/scrap-list.component';
import { SearchScrapComponent } from './components/search-scrap/search-scrap.component';
import { SawDashboardComponent } from './components/saw-dashboard/saw-dashboard.component';
import { AddSawMaterialComponent } from './components/add-saw-material/add-saw-material.component';
import { SawMaterialListComponent } from './components/saw-material-list/saw-material-list.component';
import { SearchSawMaterialComponent } from './components/search-saw-material/search-saw-material.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  // Plate/Plasma Table Routes
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add', component: AddScrapComponent },
  { path: 'list', component: ScrapListComponent },
  { path: 'search', component: SearchScrapComponent },

  // Saw Materials Routes
  { path: 'saw-dashboard', component: SawDashboardComponent },
  { path: 'saw-add', component: AddSawMaterialComponent },
  { path: 'saw-list', component: SawMaterialListComponent },
  { path: 'saw-search', component: SearchSawMaterialComponent }
];