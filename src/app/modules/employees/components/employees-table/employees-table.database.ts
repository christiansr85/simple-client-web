import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

/**
 * Contains de collection data.
 */
export class EmployeesTableDatabase {
    // Stream that emits whenever the data has been modified
    dataChange: BehaviorSubject<Array<any>> = new BehaviorSubject<Array<any>>([]);

    /**
     * Accessor for the data collection.
     */
    get data(): Array<any> {
        return this.dataChange.value;
    }

    constructor(data?: Array<any>) {
        this.dataChange.next(data);
    }
}
