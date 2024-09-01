import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { loadInvoices } from './store/invoices/invoices-actions/invoices.actions';
import { AppState } from './store/app.state';
import { Store } from '@ngrx/store';
import { loadTheme } from './store/theme/theme.actions';
import { Observable } from 'rxjs';
import { selectCurrentTheme } from './store/theme/theme.selectors';
import { AsyncPipe } from '@angular/common';
import { MainPanelComponent } from './components/main-panel/main-panel.component';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    InvoiceListComponent,
    AsyncPipe,
    MainPanelComponent,
    ToastModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent {
  currentTheme$: Observable<string>;
  constructor(private store: Store<AppState>) {
    // load data
    this.store.dispatch(loadInvoices());
    this.currentTheme$ = this.store.select(selectCurrentTheme);

    // load theme
    this.store.dispatch(loadTheme());

    // set theme
    this.currentTheme$.subscribe((theme) => {
      document.documentElement.setAttribute('data-theme', theme);
    });
  }
}
