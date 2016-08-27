import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { defaultState } from './default.state';
import { State } from './state.interface';
import 'rxjs/Rx';

const store = new BehaviorSubject<State>(defaultState);

@Injectable()
export class Store {
  store = store;
  changes = this.store
              .asObservable()
              .distinctUntilChanged();

  setState(state: State) {
    this.store.next(state);
  }

  getState() {
    return this.store.value;
  }

  purge() {
    this.store.next(defaultState);
  }
}
