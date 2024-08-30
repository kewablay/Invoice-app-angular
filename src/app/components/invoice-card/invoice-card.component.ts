import { Component, Input } from '@angular/core';
import { Invoice } from '../../models/invoice.model';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { StatusComponent } from "../status/status.component";

@Component({
  selector: 'app-invoice-card',
  standalone: true,
  imports: [DatePipe, CurrencyPipe, StatusComponent],
  templateUrl: './invoice-card.component.html',
  styleUrl: './invoice-card.component.sass',
})
export class InvoiceCardComponent {
  @Input() invoice!: Invoice;
}
