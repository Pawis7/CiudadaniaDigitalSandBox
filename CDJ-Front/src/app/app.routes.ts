import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./inicio/inicio').then((m) => m.InicioComponent),
    title: 'Inicio · Ciudadanía Digital',
  },
  {
    path: 'series',
    loadComponent: () =>
      import('./series/series-list/series-list').then((m) => m.SeriesListComponent),
    title: 'Series · Ciudadanía Digital',
  },
  {
    path: 'series/:slug',
    loadComponent: () =>
      import('./series/series-detail/series-detail').then((m) => m.SeriesDetailComponent),
    title: 'Serie · Ciudadanía Digital',
  },
  {
    path: 'edutips',
    loadComponent: () => import('./edutips/edutips').then((m) => m.EdutipsComponent),
    title: 'Edutips · Ciudadanía Digital',
  },
  {
    path: 'quienes-somos',
    loadComponent: () => import('./quienes-somos/quienes-somos').then((m) => m.QuienesSomosComponent),
    title: 'Quiénes somos · Ciudadanía Digital',
  },
  {
    path: 'pantallas-seguras',
    loadComponent: () => import('./pantallas-seguras/pantallas-seguras').then((m) => m.PantallasSegurasComponent),
    title: 'Pantallas Seguras · Ciudadanía Digital',
  },
  {
    path: 'ayuda',
    loadComponent: () => import('./ayuda/ayuda').then((m) => m.AyudaComponent),
    title: 'Ayuda Digital · Ciudadanía Digital',
  },

  {
    path: 'p/:slug',
    loadComponent: () => import('./audiencia/audiencia').then((m) => m.AudienciaComponent),
    title: 'Ciudadanía Digital',
  },
  { path: '**', redirectTo: '' },
];
