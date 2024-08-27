import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable } from 'rxjs';
import { Invoice } from '../../models/invoice.model';
import { selectFilteredInvoices } from '../../store/invoices/invoices-selectors/invoices.selectors';
import { loadInvoices } from '../../store/invoices/invoices-actions/invoices.actions';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.sass',
})
export class InvoiceListComponent {
  invoices$!: Observable<Invoice[]>;

  constructor(private store: Store<AppState>) {
    this.invoices$ = store.select(selectFilteredInvoices);
    this.invoices$.subscribe((invoices) => console.log(invoices));
  }

  ngOnInit() {
    this.store.dispatch(loadInvoices());
  }
}
