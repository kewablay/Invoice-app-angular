import { Component, Input } from '@angular/core';
import { StatusComponent } from '../status/status.component';
import { Invoice } from '../../models/invoice.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import {
  deleteInvoice,
  updateInvoice,
} from '../../store/invoices/invoices-actions/invoices.actions';

@Component({
  selector: 'app-invoice-detail-header',
  standalone: true,
  imports: [StatusComponent],
  templateUrl: './invoice-detail-header.component.html',
  styleUrl: './invoice-detail-header.component.sass',
})
export class InvoiceDetailHeaderComponent {
  @Input() invoice!: Invoice;

  constructor(private router: Router, private store: Store<AppState>) {}

  deleteInvoice = (id: string) => {
    this.store.dispatch(deleteInvoice({ id }));
    this.router.navigate(['']);
  };

  markAsPaid = (id: string) => {
    this.store.dispatch(updateInvoice({ invoice: { id, status: 'paid' } }));
  };
  markAsPending = (id: string) => {
    this.store.dispatch(updateInvoice({ invoice: { id, status: 'pending' } }));
  };
}
