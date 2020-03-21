import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-group-characteristic-popover',
    templateUrl: './group-characteristic-popover.component.html',
    styleUrls: ['./group-characteristic-popover.component.scss']
})
export class GroupCharacteristicPopoverComponent implements OnInit {
    @Input() groups;
    @Output() onClose = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
    }

    searchPopoverHideCell() {
        this.onClose.emit();
    }

    toggleWithSearch(popover) {
        if (popover.isOpen()) {
            popover.close();
        } else {
            popover.open();
        }
    }

    onChange(event, group) {

    }

}
