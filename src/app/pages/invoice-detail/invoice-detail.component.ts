import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { selectInvoiceById } from '../../store/invoices/invoices-selectors/invoices.selectors';
import { ActivatedRoute } from '@angular/router';
import { Invoice } from '../../models/invoice.model';
import { Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.sass',
})
export class InvoiceDetailComponent {
  invoice$!: Observable<Invoice | undefined>;
  constructor(private store: Store<AppState>, private route: ActivatedRoute) {
    this.invoice$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const invoiceId = params.get('invoiceId');
        return this.store.select(selectInvoiceById(invoiceId || ''));
      })
    );
  }
}
