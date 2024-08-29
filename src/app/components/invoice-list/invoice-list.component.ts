import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable } from 'rxjs';
import { Invoice } from '../../models/invoice.model';
import { selectFilteredInvoices } from '../../store/invoices/invoices-selectors/invoices.selectors';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { addInvoice, updateFilters } from '../../store/invoices/invoices-actions/invoices.actions';
import { InvoiceFormComponent } from "../invoice-form/invoice-form.component";
import { InvoiceCardComponent } from "../invoice-card/invoice-card.component";

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [AsyncPipe, RouterLink, InvoiceFormComponent, InvoiceCardComponent],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.sass',
})
export class InvoiceListComponent {
  invoices$!: Observable<Invoice[]>;

  constructor(private store: Store<AppState>) {
    this.invoices$ = this.store.select(selectFilteredInvoices);
  }

  updateFilter(filterType: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.store.dispatch(updateFilters({ filterType, filterValue: checked }));
  }

  

  createNewInvoice() {
    const newInvoice = {
      id: 'KJ3080',
      createdAt: '2021-08-18',
      paymentDue: '2021-08-19',
      description: 'Re-branding',
      paymentTerms: 1,
      clientName: 'Kewa BLay',
      clientEmail: 'kewablay@mail.com',
      status: 'pending' as 'paid' | 'pending' | 'draft',
      senderAddress: {
        street: '19 Union Terrace',
        city: 'London',
        postCode: 'E1 3EZ',
        country: 'United Kingdom',
      },
      clientAddress: {
        street: '106 Kendell Street',
        city: 'Sharrington',
        postCode: 'NR24 5WQ',
        country: 'United Kingdom',
      },
      items: [
        {
          name: 'Brand Guidelines',
          quantity: 1,
          price: 1800.9,
          total: 1800.9,
        },
      ],
      total: 1800.9,
    };

    this.store.dispatch(addInvoice({ invoice: newInvoice }));
  }
}
