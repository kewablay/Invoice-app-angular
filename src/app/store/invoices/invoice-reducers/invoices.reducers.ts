import { createReducer, on } from '@ngrx/store';
import {
  loadInvoices,
  loadInVoicesError,
  loadInvoicesSuccess,
} from '../invoices-actions/invoices.actions';
import {
  initialInvoiceState,
  invoiceAdapter,
} from '../invoice-state/invoice.state';

export const invoiceReducer = createReducer(
  initialInvoiceState,
  on(loadInvoices, (state) => ({ ...state, loading: true })),
  on(loadInvoicesSuccess, (state, { invoices }) =>
    invoiceAdapter.setAll(invoices, { ...state, loading: false })
  ),
  on(loadInVoicesError, (state, { error }) => ({ ...state, error }))
);
