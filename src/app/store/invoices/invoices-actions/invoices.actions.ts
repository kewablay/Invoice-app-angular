import { createAction, props } from '@ngrx/store';
import { Invoice } from '../../../models/invoice.model';

export const loadInvoices = createAction('[Invoices] Load Invoices');
export const loadInvoicesSuccess = createAction(
  '[Invoices] Load Invoices Success',
  props<{ invoices: Invoice[] }>()
);
export const loadInVoicesError = createAction(
  '[Invoices ] Load Invoices Error',
  props<{ error: string }>()
);
