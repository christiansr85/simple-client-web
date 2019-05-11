import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Employee } from 'src/app/models';

import * as EmployeeActions from './employee.actions';

export interface EmployeeState {
    employee?: Employee;
    employees?: Employee[];
    loading?: boolean;
    loaded?: boolean;
    error?: boolean;
}

export const initialState: EmployeeState = {
    employees: [],
    employee: null,
    loading: false,
    loaded: false,
    error: false
};

export function reducer(
    state = initialState,
    action: EmployeeActions.EmployeeActionsUnion
): EmployeeState {
    switch (action.type) {
        case EmployeeActions.EmployeeActionTypes.EMPLOYEE_GET_LIST: {
            return {
                ...state,
                loaded: false,
                loading: true,
                error: false
            };
        }
        case EmployeeActions.EmployeeActionTypes.EMPLOYEE_GET_LIST_SUCCESS: {
            return {
                ...state,
                employees: action.payload,
                loaded: true,
                loading: false,
                error: false
            };
        }
        case EmployeeActions.EmployeeActionTypes.EMPLOYEE_GET_LIST_FAIL: {
            return {
                ...state,
                employees: [],
                loaded: true,
                loading: false,
                error: true
            };
        }
        case EmployeeActions.EmployeeActionTypes.EMPLOYEE_DELETE: {
            return {
                ...state,
                loaded: false,
                loading: true,
                error: false
            };
        }
        case EmployeeActions.EmployeeActionTypes.EMPLOYEE_DELETE_SUCCESS: {
            return {
                ...state,
                employees: state.employees.filter(item => item.userId !== action.payload),
                loaded: true,
                loading: false,
                error: false
            };
        }
        case EmployeeActions.EmployeeActionTypes.EMPLOYEE_DELETE_FAIL: {
            return {
                ...state,
                loaded: true,
                loading: false,
                error: true
            };
        }
        default: {
            return state;
        }
    }
}

export const employeeFeature = 'employeeFeature';
export const selectEmployeeState = createFeatureSelector<EmployeeState>(employeeFeature);

export const getAll = createSelector(selectEmployeeState, (state: EmployeeState) => state.employees);

export const selectFlags = createSelector(
    selectEmployeeState,
    (state: EmployeeState) => {
        return {
            loaded: state.loaded,
            loading: state.loading,
        };
    }
);


