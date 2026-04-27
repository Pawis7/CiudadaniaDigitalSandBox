import { Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: '**', redirectTo: '' }
];
