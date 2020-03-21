import { Component, OnInit, ElementRef, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'ui-field-password',
    templateUrl: './field-password.component.html',
    styleUrls: ['./field.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class UiFieldPasswordComponent implements OnInit {
    showPass = false;
    showTypeAttr;
    searchTypeAttr;

    constructor(private el: ElementRef) {
    }

    ngOnInit() {
    }

    changeType() {
        this.showPass = !this.showPass;
        this.searchTypeAttr = this.showPass ? 'password' : 'text';
        this.showTypeAttr = this.showPass ? 'text' : 'password';

        this.el.nativeElement.querySelector('input[type="' + this.searchTypeAttr + '"]')
            .setAttribute('type', this.showTypeAttr);
    }
}
