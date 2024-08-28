import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable } from 'rxjs';
import { Invoice } from '../../models/invoice.model';
import { selectFilteredInvoices } from '../../store/invoices/invoices-selectors/invoices.selectors';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [AsyncPipe, RouterLink],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.sass',
})
export class InvoiceListComponent {
  invoices$!: Observable<Invoice[]>;
  singleInvoice$!: Observable<Invoice | undefined>;

  constructor(private store: Store<AppState>) {
    this.invoices$ = this.store.select(selectFilteredInvoices);
  }
}
