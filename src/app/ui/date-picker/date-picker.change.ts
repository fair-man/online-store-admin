export class UIDatePickerChange<D> {

    private _value: D;

    constructor(newValue: D) {
        this._value = newValue;
    }

    get value(): D {
        return this._value;
    }
}
