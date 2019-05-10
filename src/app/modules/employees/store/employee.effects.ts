import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError } from 'rxjs/internal/operators/catchError';
import { map } from 'rxjs/internal/operators/map';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { EmployeesService } from 'src/app/services';

import * as EmployeeActions from './employee.actions';

@Injectable()
export class EmployeeEffects {

    @Effect()
    getCustomers: Observable<EmployeeActions.EmployeeActionsUnion> = this.actions$.pipe(
        ofType(EmployeeActions.EmployeeActionTypes.EMPLOYEE_GET_LIST),
        switchMap(() =>
            this.employeesService.getAll().pipe(
                map(employees => new EmployeeActions.EmployeeListSuccessAction(employees)),
                catchError(error => of(new EmployeeActions.EmployeeListFailAction(error))),
            ),
        ),
    );

    constructor(
        private actions$: Actions,
        private employeesService: EmployeesService
    ) { }
}
