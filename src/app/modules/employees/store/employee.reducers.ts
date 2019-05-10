import { Employee } from 'src/app/models';
import * as EmployeeActions from './employee.actions';

import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';

export interface EmployeeState extends EntityState<Employee> {
    employee?: Employee;
    employees?: any[];
    loading?: boolean;
    loaded?: boolean;
}

export const adapter: EntityAdapter<Employee> = createEntityAdapter<Employee>();

export const initialState: EmployeeState = adapter.getInitialState({
    employees: [],
    employee: null,
    loading: false,
    loaded: false
});

export function reducer(
    state = initialState,
    action: EmployeeActions.EmployeeActionsUnion
): EmployeeState {
    switch (action.type) {
        case EmployeeActions.EmployeeActionTypes.EMPLOYEE_GET_LIST: {
            return {
                ...state,
                loaded: false,
                loading: true
            };
        }
        case EmployeeActions.EmployeeActionTypes.EMPLOYEE_GET_LIST_SUCCESS: {
            return adapter.addAll(action.payload, {
                ...state,
                loaded: true,
                loading: false
            });
        }
        case EmployeeActions.EmployeeActionTypes.EMPLOYEE_GET_LIST_FAIL: {
            return adapter.removeAll({
                ...state,
                loaded: true,
                loading: false
            });
        }
        default: {
            return state;
        }
    }
}

export const employeeFeature = 'employeeFeature';
export const selectEmployeeState = createFeatureSelector<EmployeeState>(employeeFeature);

export const getEmployees = createSelector(selectEmployeeState, (state: EmployeeState) => state.employees);

export const {
  // select the array of employee ids
  selectIds,
  // select the dictionary of employee entities
  selectEntities,
  // select the array of employee
  selectAll,
} = adapter.getSelectors(selectEmployeeState);

