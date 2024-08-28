import { Routes } from '@angular/router';
// import { InvoiceDetailComponent } from './pages/invoice-detail/invoice-detail.component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'invoice-detail/:invoiceId',
    loadComponent: () =>
      import('./pages/invoice-detail/invoice-detail.component').then(
        (m) => m.InvoiceDetailComponent
      ),
  },
];
