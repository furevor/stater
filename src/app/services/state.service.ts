import { Injectable } from '@angular/core';
import { NEVER, Observable, of, Subject } from 'rxjs';
import { ItemsState } from '../assets/item.state.interface';
import { publishReplay, refCount, scan, startWith } from 'rxjs/operators';
import { Action } from '../assets/action.interface';
import { ofType } from '../operators';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  readonly defaultState: ItemsState = {
    items: [],
    loading: false
  };

  actions$: Subject<Action>;
  state$: Observable<ItemsState>;
  load$: Observable<Action>;

  constructor() {
    this.actions$ = new Subject<Action>();

    this.state$ =
      this.actions$.pipe(
        startWith(this.defaultState),
        scan(this.stateReducer),
        publishReplay(1),
        refCount()
      );

    this.load$ =
      this.actions$.pipe(
        ofType('load')
      );
  }

  public getState(): Observable<ItemsState> {
    return this.state$;
  }

  public stateReducer(
    state: ItemsState,
    action: Action
  ): ItemsState {
    switch (action.type) {
      case 'load':
        return {...state, loading: true};
      case 'load success':
        return {...state, loading: false};
      default:
        return state;
    }
  }
}
