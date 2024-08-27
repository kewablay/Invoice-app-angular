import { InvoiceState } from './invoices/invoice-state/invoice.state';

export interface AppState {
  invoices: InvoiceState;
  // filters: FilterState[],
}
