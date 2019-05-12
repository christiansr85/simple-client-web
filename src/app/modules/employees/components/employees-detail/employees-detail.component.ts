import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Employee } from 'src/app/models';

/**
 * Form where an employee can be created or updated.
 */
@Component({
    selector: 'app-employees-detail',
    templateUrl: './employees-detail.component.html',
    styleUrls: ['./employees-detail.component.scss']
})
export class EmployeesDetailComponent implements OnInit, OnChanges, OnDestroy {

    /**
     * The form which represents the employee model.
     */
    empForm: FormGroup;

    /**
     * Stores the employee to edit, if any.
     */
    @Input() employee: Employee = {};

    /**
     * Event emitter triggered every time the form has been changed.
     */
    @Output() onFormChange: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

    /**
     * Subscription object to handle all the view subscriptions.
     */
    private subscription: Subscription = new Subscription();

    constructor(
        public translate: TranslateService,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.buildForm();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.employee && changes.employee.currentValue) {
            this.buildForm(this.employee);
        }
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    /**
     * Builds the form object. If we are updating an employee, the form is filled
     * with the employee properties values.
     * @param employee (Optional) The employee to edit.
     */
    buildForm(employee?: Employee): void {
        this.empForm = this.formBuilder.group({
            name: [employee ? employee.name : '', Validators.required],
            clockIn: [employee ? employee.clockIn : ''],
            clockOut: [employee ? employee.clockOut : ''],
            active: [employee ? employee.active : false]
        });
        this.subscription.add(
            this.empForm.valueChanges
                .subscribe(result =>
                    this.onFormChange.emit(this.empForm))
        );
    }

    /**
     * Access to form's controls.
     */
    get f() { return this.empForm.controls; }

    /**
     * Triggered every time the 'active' switch changes its value.
     * @param value 
     */
    onActiveChanged(value: boolean): void {
        this.f.active.setValue(value);
        this.onFormChange.emit(this.empForm);
    }
}
