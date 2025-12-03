import { Routes } from '@angular/router';
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
  { path: '', component: HomeComponent },

  // Plate/Plasma Table Routes
  { path: 'plasma/dashboard', component: DashboardComponent },
  { path: 'plasma/add', component: AddScrapComponent },
  { path: 'plasma/list', component: ScrapListComponent },
  { path: 'plasma/search', component: SearchScrapComponent },

  // Saw Materials Routes
  { path: 'saw/dashboard', component: SawDashboardComponent },
  { path: 'saw/add', component: AddSawMaterialComponent },
  { path: 'saw/list', component: SawMaterialListComponent },
  { path: 'saw/search', component: SearchSawMaterialComponent }
];