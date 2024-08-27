import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { InvoicesEffects } from './store/invoices/invoices-effects/invoices.effects';
import { invoiceReducer } from './store/invoices/invoice-reducers/invoices.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideEffects(InvoicesEffects),
    provideStore(),
    provideHttpClient(),
    provideEffects(),
    provideState({ name: 'invoices', reducer: invoiceReducer }),
  ],
};
