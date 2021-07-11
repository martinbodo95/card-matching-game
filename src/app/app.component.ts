import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SelectInput } from './models/select-input.model';
import { GameService } from './services/game.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    gameForm: FormGroup;
    numberOfCardsOptions: SelectInput[] = [];
    private subscriptions: Subscription[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private gameService: GameService,
        public router: Router
    ) {
        this.gameForm = this.formBuilder.group({
            numberOfCards: [JSON.parse(sessionStorage.getItem('nrOfCards')!) || 6]
        });
        for (let i = 6; i <= 20; i += 2) {
            this.numberOfCardsOptions.push({ value: i })
        }
        this.subscriptions.push(this.numberOfCardsField.valueChanges.subscribe(val => {
            sessionStorage.setItem('nrOfCards', JSON.stringify(val));
        }));
    }

    startNewGame() {
        sessionStorage.setItem('nrOfCards', JSON.stringify(this.numberOfCards));
        this.gameService.startNewGame();
    }

    get numberOfCards(): number { return this.numberOfCardsField.value; }
    get numberOfCardsField(): AbstractControl { return this.gameForm.get('numberOfCards')!; }

    ngOnDestroy() {
        this.subscriptions.forEach((sub) => {
            sub.unsubscribe();
        })
    }
}