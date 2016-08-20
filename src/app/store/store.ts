import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { defaultState } from './default.state';
import { State } from './state.interface';
import 'rxjs/Rx';

const _store = new BehaviorSubject<State>(defaultState);

@Injectable()
export class Store {
  private _store = _store;
  changes = this._store
              .asObservable()
              .distinctUntilChanged();

  setState(state: State) {
    console.log('set state', state);
    this._store.next(state);
  }

  getState(): State {
    return this._store.value;
  }

  purge() {
    this._store.next(defaultState);
  }
}
