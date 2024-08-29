import { InvoiceState } from './invoices/invoice-state/invoice.state';
import { ThemeState } from './theme/theme.reducers';

export interface AppState {
  invoices: InvoiceState;
  theme: ThemeState;
}
