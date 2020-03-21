import { AbstractControl, ValidatorFn } from '@angular/forms';

export function checkCharacteristicsValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const val = control.value;
        return val && val.name && val.description && val.value && val.sort_order ? null :
            {'Ошибка валидации характеристики': true};
    };
}
