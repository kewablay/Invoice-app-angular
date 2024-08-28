import { createAction, props } from '@ngrx/store';
import { Invoice } from '../../../models/invoice.model';
import { Filters } from '../invoice-state/invoice.state';

export const loadInvoices = createAction('[Invoices] Load Invoices');
export const loadInvoicesSuccess = createAction(
  '[Invoices] Load Invoices Success',
  props<{ invoices: Invoice[] }>()
);
export const loadInVoicesError = createAction(
  '[Invoices ] Load Invoices Error',
  props<{ error: string }>()
);

export const addInvoice = createAction(
  '[Invoices] Add Invoice',
  props<{ invoice: Invoice }>()
);
export const updateInvoice = createAction(
  '[Invoices] Update Invoice',
  props<{ invoice: Partial<Invoice> & { id: string } }>()
);
export const deleteInvoice = createAction(
  '[Invoices] Delete Invoice',
  props<{ id: string }>()
);

// export const updateFilters = createAction(
//   '[Invoices] Update Filters',
//   props<{ filters: { paid: boolean; pending: boolean; draft: boolean } }>()
// );

export const updateFilters = createAction(
  '[Invoices] Update Filters',
  props<{ filterType: string; filterValue: boolean }>()
);
