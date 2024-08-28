import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { selectInvoiceById } from '../../store/invoices/invoices-selectors/invoices.selectors';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from '../../models/invoice.model';
import { Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import {
  deleteInvoice,
  updateInvoice,
} from '../../store/invoices/invoices-actions/invoices.actions';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.sass',
})
export class InvoiceDetailComponent {
  invoice$!: Observable<Invoice | undefined>;
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.invoice$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const invoiceId = params.get('invoiceId');
        return this.store.select(selectInvoiceById(invoiceId || ''));
      })
    );
  }

  

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
