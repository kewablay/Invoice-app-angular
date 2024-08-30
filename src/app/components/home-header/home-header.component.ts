import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable } from 'rxjs';
import { updateFilters } from '../../store/invoices/invoices-actions/invoices.actions';
import { selectFilters } from '../../store/invoices/invoices-selectors/invoices.selectors';
import { Filters } from '../../store/invoices/invoice-state/invoice.state';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home-header',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './home-header.component.html',
  styleUrl: './home-header.component.sass',
})
export class HomeHeaderComponent {
  // invoice$: Observable
  total: number = 7
  filters$: Observable<Filters>
  constructor(private store: Store<AppState>) {
    this.filters$ = this.store.select(selectFilters)
  }

  updateFilter(filterType: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.store.dispatch(updateFilters({ filterType, filterValue: checked }));
  }

}
