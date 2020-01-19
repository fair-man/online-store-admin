export const Enums = {
    errorCodes: {},
    masks: {
        phoneMask: ['8', '(', '0', /[1-9]/, /[1-9]/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/],
    }
};

Enums.errorCodes[100000] = 'Неизвестная ошибка. Повторите попытку через некоторое время. При повторении ошибки' +
    ' свяжитесь с техподдержкой системы.';
