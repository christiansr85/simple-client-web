import { InjectionToken, Type } from '@angular/core';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';
import { environment } from 'src/environments/environment';

import { EmployeeEffects } from './employee.effects';
import * as fromEmployee from './employee.reducers';


export interface AppState {
    employeeFeature: fromEmployee.EmployeeState;
}

export const reducers: ActionReducerMap<AppState> = {
    employeeFeature: fromEmployee.reducer
};

export const effects: Type<any>[] = [
    EmployeeEffects
];


export const reducerToken = new InjectionToken<ActionReducerMap<AppState>>('Reducers');

const getReducers = () => reducers;

export const reducerProvider = [{ provide: reducerToken, useFactory: getReducers }];

const blacklist = [];

const logger = storeLogger({
    filter: { blacklist },
    collapsed: true,
});

export function loggerReducer(reducer) {
    return logger(reducer);
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
    ? [storeFreeze, loggerReducer]
    : [];

