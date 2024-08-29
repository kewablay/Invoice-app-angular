import { Component, Input } from '@angular/core';
import { Invoice } from '../../models/invoice.model';

@Component({
  selector: 'app-invoice-card',
  standalone: true,
  imports: [],
  templateUrl: './invoice-card.component.html',
  styleUrl: './invoice-card.component.sass',
})
export class InvoiceCardComponent {
  @Input() invoice!: Invoice;
}
