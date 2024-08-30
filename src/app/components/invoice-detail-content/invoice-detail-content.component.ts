import { Component, Input } from '@angular/core';
import { Invoice } from '../../models/invoice.model';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-invoice-detail-content',
  standalone: true,
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './invoice-detail-content.component.html',
  styleUrl: './invoice-detail-content.component.sass',
})
export class InvoiceDetailContentComponent {
  @Input() invoice!: Invoice;
}
