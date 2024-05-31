import { Routes } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
    { path: 'categorias', component: CategoriesComponent },
    { path: '', component: DashboardComponent },
];
