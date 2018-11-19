import { Injectable } from '@angular/core';
import { NEVER, Observable, of, Subject } from 'rxjs';
import { ItemsState } from '../assets/item.state.interface';
import { publishReplay, refCount, startWith } from 'rxjs/operators';
import { Action } from '../assets/action.interface';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  readonly defaultState: ItemsState = {
    items: [],
    loading: false
  };

  actions$: Subject<Action> = new Subject<Action>();
  state$: Observable<ItemsState>;

  constructor() {
    this.state$ = this.actions$.pipe(
      startWith(this.defaultState),
      publishReplay(1),
      refCount()
    );
  }

  public getState(): Observable<ItemsState> {
    return this.state$;
  }
}
