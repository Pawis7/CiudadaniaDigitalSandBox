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
    path: 'recurso/:slug',
    loadComponent: () => import('./recurso/recurso-detail').then((m) => m.RecursoDetailComponent),
    title: 'Recurso · Ciudadanía Digital',
  },
  {
    path: 'recursos',
    loadComponent: () => import('./recursos/recursos').then((m) => m.RecursosComponent),
    title: 'Recursos · Ciudadanía Digital',
  },
  {
    path: 'quienes-somos',
    loadComponent: () => import('./quienes-somos/quienes-somos').then((m) => m.QuienesSomosComponent),
    title: 'Quiénes somos · Ciudadanía Digital',
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
