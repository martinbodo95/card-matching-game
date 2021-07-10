import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent {
    @Input() imgUrl = 'asd';
    @Input() flipped = false;
    @Input() disabled = false;

    constructor() { }
}
