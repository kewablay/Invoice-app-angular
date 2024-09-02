import { Injectable } from '@angular/core';
import { DataService } from '../../../services/dataService/data.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LocalStorageService } from '../../../services/localStorageService/local-storage.service';
import {
  loadInvoices,
  loadInVoicesError,
  loadInvoicesSuccess,
} from '../invoices-actions/invoices.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Invoice } from '../../../models/invoice.model';
import * as InvoicesActions from '../invoices-actions/invoices.actions';
import { Store } from '@ngrx/store';
import { selectAllInvoices } from '../invoices-selectors/invoices.selectors';

@Injectable()
export class InvoicesEffects {
  constructor(
    private dataService: DataService,
    private actions$: Actions,
    private localStorageService: LocalStorageService,
    private store: Store
  ) {}

  loadInvoices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoicesActions.loadInvoices),
      switchMap(() => {
        const invoices = this.localStorageService.getItem('invoices');
        if (invoices) {
          return of(InvoicesActions.loadInvoicesSuccess({ invoices }));
        } else {
          return this.dataService.getInvoice().pipe(
            map((invoices: Invoice[]) => {
              this.localStorageService.setItem('invoices', invoices);
              return InvoicesActions.loadInvoicesSuccess({ invoices });
            }),
            catchError((error) =>
              of(InvoicesActions.loadInVoicesError({ error: error }))
            )
          );
        }
      })
    )
  );

  addInvoice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        InvoicesActions.addInvoice,
        InvoicesActions.updateInvoice,
        InvoicesActions.deleteInvoice
      ),
      switchMap(() =>
        this.store.select(selectAllInvoices).pipe(
          map((invoices: Invoice[]) => {
            this.localStorageService.setItem('invoices', invoices);
            return InvoicesActions.addInvoiceSuccess(); // Return an Action
          })
        )
      )
    )
  );
}
