import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { InvoicesEffects } from './store/invoices/invoices-effects/invoices.effects';
import { invoiceReducer } from './store/invoices/invoice-reducers/invoices.reducers';
import { themeEffect } from './store/theme/theme.effects';
import { themeReducer } from './store/theme/theme.reducers';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideEffects(InvoicesEffects),
    importProvidersFrom(BrowserAnimationsModule),
    provideStore(),
    provideHttpClient(),
    provideEffects(themeEffect),
    provideState({ name: 'invoices', reducer: invoiceReducer }),
    provideState({ name: 'theme', reducer: themeReducer }),
    MessageService,
    ConfirmationService,
  ],
};
