import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { toggleTheme } from '../../store/theme/theme.actions';
import { Observable } from 'rxjs';
import { selectCurrentTheme } from '../../store/theme/theme.selectors';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-main-panel',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './main-panel.component.html',
  styleUrl: './main-panel.component.sass',
})
export class MainPanelComponent {
  theme$: Observable<string>;
  constructor(private store: Store<AppState>) {
    this.theme$ = this.store.select(selectCurrentTheme);
  }
  

  toggleTheme() {
    this.store.dispatch(toggleTheme());
  }
}
