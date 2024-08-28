import { createReducer, on } from '@ngrx/store';
import {
  addInvoice,
  deleteInvoice,
  loadInvoices,
  loadInVoicesError,
  loadInvoicesSuccess,
  updateFilters,
  updateInvoice,
} from '../invoices-actions/invoices.actions';
import {
  initialInvoiceState,
  invoiceAdapter,
} from '../invoice-state/invoice.state';
import { filter } from 'rxjs';

export const invoiceReducer = createReducer(
  initialInvoiceState,
  on(loadInvoices, (state) => ({ ...state, loading: true })),
  on(loadInvoicesSuccess, (state, { invoices }) =>
    invoiceAdapter.setAll(invoices, { ...state, loading: false })
  ),
  on(loadInVoicesError, (state, { error }) => ({ ...state, error })),
  on(addInvoice, (state, { invoice }) => invoiceAdapter.addOne(invoice, state)),
  on(updateInvoice, (state, { invoice }) =>
    invoiceAdapter.updateOne({ id: invoice.id, changes: invoice }, state)
  ),
  on(deleteInvoice, (state, { id }) => invoiceAdapter.removeOne(id, state)),
  on(updateFilters, (state, { filterType, filterValue }) => ({
    ...state,
    filters: { ...state.filters, [filterType]: filterValue },
  }))
);
