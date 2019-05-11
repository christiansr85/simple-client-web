import { Action } from '@ngrx/store';
import { Employee } from 'src/app/models';

export enum EmployeeActionTypes {
    EMPLOYEE_GET_LIST = '[Employee] Get employees list',
    EMPLOYEE_GET_LIST_SUCCESS = '[Employee] Get employees list SUCCESS',
    EMPLOYEE_GET_LIST_FAIL = '[Employee] Get employees list FAIL',

    EMPLOYEE_DELETE = '[Employee] Delete employee',
    EMPLOYEE_DELETE_SUCCESS = '[Employee] Delete employee SUCCESS',
    EMPLOYEE_DELETE_FAIL = '[Employee] Delete employee FAIL',
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

export class EmployeeDeleteAction implements Action {
    readonly type = EmployeeActionTypes.EMPLOYEE_DELETE;
    constructor(public payload: number) { }
}

export class EmployeeDeleteSuccessAction implements Action {
    readonly type = EmployeeActionTypes.EMPLOYEE_DELETE_SUCCESS;
    constructor(public payload?: any) { }
}

export class EmployeeDeleteFailAction implements Action {
    readonly type = EmployeeActionTypes.EMPLOYEE_DELETE_FAIL;
    constructor(public payload?: any) { }
}

export type EmployeeActionsUnion =
  | EmployeeListAction
  | EmployeeListSuccessAction
  | EmployeeListFailAction
  | EmployeeDeleteAction
  | EmployeeDeleteSuccessAction
  | EmployeeDeleteFailAction
  ;
