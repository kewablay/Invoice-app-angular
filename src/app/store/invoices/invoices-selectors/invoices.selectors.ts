import { createFeatureSelector, createSelector } from '@ngrx/store';
import { invoiceAdapter, InvoiceState } from '../invoice-state/invoice.state';

export const selectInvoiceState =
  createFeatureSelector<InvoiceState>('invoices');

export const {
  selectAll: selectAllInvoices,
  selectEntities: selectInvoiceEntities,
  selectIds: selectInvoiceIds,
  selectTotal: selectTotal,
} = invoiceAdapter.getSelectors(selectInvoiceState);

export const selectInvoiceLoading = createSelector(
  selectInvoiceState,
  (state) => state.loading
);

export const selectInvoiceError = createSelector(
  selectInvoiceState,
  (state) => state.error
);

export const selectFilters = createSelector(
  selectInvoiceState,
  (state) => state.filters
);

export const selectFilteredInvoices = createSelector(
  selectAllInvoices,
  selectFilters,
  (invoices, filters) => {
    if (!filters.paid && !filters.pending && !filters.draft) {
      return invoices;
    }

    return invoices.filter(
      (invoice) =>
        (filters.paid && invoice.status === 'paid') ||
        (filters.pending && invoice.status === 'pending') ||
        (filters.draft && invoice.status === 'draft')
    );
  }
);


export const selectInvoiceById = (id: string) =>
  createSelector(selectInvoiceEntities, (entities) => entities[id]);
