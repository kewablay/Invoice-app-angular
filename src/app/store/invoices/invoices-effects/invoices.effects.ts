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

@Injectable()
export class InvoicesEffects {
  constructor(
    private dataService: DataService,
    private actions$: Actions,
    private localStorageService: LocalStorageService
  ) {}

  loadInvoices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(InvoicesActions.loadInvoices),
      switchMap(() =>
        this.dataService.getInvoice().pipe(
          map((invoices: Invoice[]) => {
            this.localStorageService.setItem('invoices', invoices);
            return InvoicesActions.loadInvoicesSuccess({ invoices });
          }),
          catchError((error) =>
            of(InvoicesActions.loadInVoicesError({ error: error }))
          )
        )
      )
    )
  );
}
