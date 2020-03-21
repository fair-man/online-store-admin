import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/index';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    private _loading: BehaviorSubject<boolean>;

    constructor() {
        this._loading = <BehaviorSubject<boolean>>new BehaviorSubject(false);
    }

    get loadingState() {
        return this._loading.asObservable();
    }

    updateLoadingState(isVisible: boolean) {
        this._loading.next(isVisible);
    }
}
