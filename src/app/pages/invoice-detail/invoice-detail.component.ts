import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { selectInvoiceById } from '../../store/invoices/invoices-selectors/invoices.selectors';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Invoice } from '../../models/invoice.model';
import { Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import {
  deleteInvoice,
  updateInvoice,
} from '../../store/invoices/invoices-actions/invoices.actions';
import { InvoiceFormComponent } from "../../components/invoice-form/invoice-form.component";
import { InvoiceDetailHeaderComponent } from "../../components/invoice-detail-header/invoice-detail-header.component";
import { InvoiceDetailContentComponent } from "../../components/invoice-detail-content/invoice-detail-content.component";

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [AsyncPipe, InvoiceFormComponent, InvoiceDetailHeaderComponent, InvoiceDetailContentComponent, RouterLink],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.sass',
})
export class InvoiceDetailComponent {
  invoice$!: Observable<Invoice | undefined>;
  constructor(
    private store: Store<AppState>,
    private route: ActivatedRoute,
  ) {
    this.invoice$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const invoiceId = params.get('invoiceId');
        return this.store.select(selectInvoiceById(invoiceId || ''));
      })
    );
  }

  testInvoice = (id: string) => {
    const data = {
      clientName: 'Kewa Blay',
      clientEmail: 'kojokewajunior123@gmail.com',
    };

    this.updateInvoice(id, data);
  };

  updateInvoice = (id: string, invoice: Partial<Invoice>) => {
    this.store.dispatch(updateInvoice({ invoice: { id, ...invoice } }));
  };
}
