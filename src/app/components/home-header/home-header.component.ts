import { Component } from '@angular/core';
import {  Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable } from 'rxjs';
import {
  updateFilters,
} from '../../store/invoices/invoices-actions/invoices.actions';
import { selectFilters } from '../../store/invoices/invoices-selectors/invoices.selectors';
import { Filters } from '../../store/invoices/invoice-state/invoice.state';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { InvoiceFormComponent } from '../invoice-form/invoice-form.component';
import { ModalService } from '../../services/modalService/modal.service';

@Component({
  selector: 'app-home-header',
  standalone: true,
  imports: [
    AsyncPipe,
    SidebarModule,
    InvoiceFormComponent,
    RouterLink,
  ],
  templateUrl: './home-header.component.html',
  styleUrl: './home-header.component.sass',
})
export class HomeHeaderComponent {
  total: number = 7;
  filters$: Observable<Filters>;

  isNewInvoiceModalOpen!: boolean;

  constructor(
    private store: Store<AppState>,
    private modalService: ModalService,
  ) {
    this.filters$ = this.store.select(selectFilters);

    this.modalService.isModalOpen('newInvoice').subscribe((isOpen) => {
      this.isNewInvoiceModalOpen = isOpen;
    });
  }

  updateFilter(filterType: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.store.dispatch(updateFilters({ filterType, filterValue: checked }));
  }

  openNewInvoiceModal() {
    this.modalService.openModal('newInvoice');
  }
  closeNewInvoiceModal() {
    this.modalService.closeModal('newInvoice');
  }


  onSidebarVisibleChange(isVisible: boolean) {
    if (isVisible) {
      this.modalService.openModal('newInvoice');
    } else {
      this.modalService.closeModal('newInvoice');
    }
  }
}
