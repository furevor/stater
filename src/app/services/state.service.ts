import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ItemsState } from '../assets/item.state.interface';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  readonly defaultState: ItemsState = {
    items: [],
    loading: false
  };

  constructor() { }

  getState(): Observable<ItemsState> {
    return of(this.defaultState);
  }
}
