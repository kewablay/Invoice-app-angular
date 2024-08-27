import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Invoice } from '../../../models/invoice.model';

export interface InvoiceState extends EntityState<Invoice> {
  invoices: Invoice[];
  filters: {
    paid: boolean;
    pending: boolean;
    draft: boolean;
  };
  loading: boolean;
  error: string | null;
}

export const invoiceAdapter: EntityAdapter<Invoice> =
  createEntityAdapter<Invoice>({
    selectId: (invoice: Invoice) => invoice.id,
    sortComparer: false,
  });

export const initialInvoiceState: InvoiceState = invoiceAdapter.getInitialState(
  {
    invoices: [],
    loading: false,
    error: null,
    filters: {
      paid: false,
      pending: false,
      draft: false,
    },
  }
);
