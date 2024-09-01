import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable } from 'rxjs';
import {
  deleteInvoice,
  updateFilters,
  updateInvoice,
} from '../../store/invoices/invoices-actions/invoices.actions';
import { selectFilters } from '../../store/invoices/invoices-selectors/invoices.selectors';
import { Filters } from '../../store/invoices/invoice-state/invoice.state';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { InvoiceFormComponent } from '../invoice-form/invoice-form.component';
import { ModalService } from '../../services/modalService/modal.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-home-header',
  standalone: true,
  imports: [
    AsyncPipe,
    SidebarModule,
    InvoiceFormComponent,
    RouterLink,
    ToastModule,
  ],
  templateUrl: './home-header.component.html',
  styleUrl: './home-header.component.sass',
  providers: [MessageService],
})
export class HomeHeaderComponent {
  // invoice$: Observable
  total: number = 7;
  filters$: Observable<Filters>;

  isNewInvoiceModalOpen!: boolean;

  constructor(
    private store: Store<AppState>,
    private modalService: ModalService,
    private toastService: ToastService,
    private messageService: MessageService
  ) {
    this.filters$ = this.store.select(selectFilters);

    this.modalService.isModalOpen('newInvoice').subscribe((isOpen) => {
      this.isNewInvoiceModalOpen = isOpen;
    });
    // this.isNewInvoiceModalOpen = true
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

  // showToast(event: { type: string; message: string; title: string }) {
  //   this.toastService.showToast({
  //     type: event.type,
  //     message: event.message,
  //     title: event.title,
  //   });
  // }
  showToast(event: { type: string; message: string; title: string }) {
    this.messageService.add({
      severity: event.type,
      summary: event.title,
      detail: event.message,
    });
  }

  onSidebarVisibleChange(isVisible: boolean) {
    if (isVisible) {
      this.modalService.openModal('newInvoice');
    } else {
      this.modalService.closeModal('newInvoice');
    }
  }
}
