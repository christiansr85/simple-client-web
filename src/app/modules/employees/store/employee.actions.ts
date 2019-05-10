import { Action } from '@ngrx/store';
import { Employee } from 'src/app/models';

export enum EmployeeActionTypes {
    EMPLOYEE_GET_LIST = '[Employee] Get employees list',
    EMPLOYEE_GET_LIST_SUCCESS = '[Employee] Get employees list SUCCESS',
    EMPLOYEE_GET_LIST_FAIL = '[Employee] Get employees list FAIL',
}

export class EmployeeListAction implements Action {
    readonly type = EmployeeActionTypes.EMPLOYEE_GET_LIST;
    constructor(public payload?: any) { }
}

export class EmployeeListSuccessAction implements Action {
    readonly type = EmployeeActionTypes.EMPLOYEE_GET_LIST_SUCCESS;
    constructor(public payload: Employee[]) { }
}

export class EmployeeListFailAction implements Action {
    readonly type = EmployeeActionTypes.EMPLOYEE_GET_LIST_FAIL;
    constructor(public payload: any) { }
}

export type EmployeeActionsUnion =
  | EmployeeListAction
  | EmployeeListSuccessAction
  | EmployeeListFailAction;
