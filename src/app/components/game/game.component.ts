import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card.model';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

    tries = 0;
    best = 0;
    cards: Card[] = [];
    
    constructor() { }

    ngOnInit(): void {
    }

}
