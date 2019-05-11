import { Component, EventEmitter, Input, OnChanges, OnInit, SimpleChanges, Output, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Employee } from 'src/app/models';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
    selector: 'app-employees-detail',
    templateUrl: './employees-detail.component.html',
    styleUrls: ['./employees-detail.component.scss']
})
export class EmployeesDetailComponent implements OnInit, OnChanges, OnDestroy {

    empForm: FormGroup;

    onAccept: EventEmitter<Employee> = new EventEmitter<Employee>();
    onCancel: EventEmitter<any> = new EventEmitter<any>();

    @Input() employee: Employee = {};

    @Output() onFormChange: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

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

    buildForm(employee?: Employee): void {
        this.empForm = this.formBuilder.group({
            name: [employee ? employee.name : '', Validators.required],
            clockIn: [employee ? employee.clockIn : ''],
            clockOut: [employee ? employee.clockOut : ''],
            active: [employee ? employee.active : false]
        });
        // this.subscription.unsubscribe();
        this.subscription.add(
            this.empForm.valueChanges
                .subscribe(result =>
                    this.onFormChange.emit(this.empForm))
        );
    }

    get f() { return this.empForm.controls; }

    onActiveChanged(value: boolean): void {
        this.f.active.setValue(value);
        this.onFormChange.emit(this.empForm);
    }
}
