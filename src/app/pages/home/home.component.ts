import { Component } from '@angular/core';
import { InvoiceListComponent } from "../../components/invoice-list/invoice-list.component";
import { HomeHeaderComponent } from "../../components/home-header/home-header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [InvoiceListComponent, HomeHeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.sass'
})
export class HomeComponent {
}
