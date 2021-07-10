import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SelectInput } from 'src/app/models/select-input.model';
import { GameService } from 'src/app/services/game.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    gameForm: FormGroup;
    numberOfCardsOptions: SelectInput[] = [];
    private subscriptions: Subscription[] = [];

    constructor(
        private formBuilder: FormBuilder,
        private gameService: GameService
    ) {
        this.gameForm = this.formBuilder.group({
            numberOfCards: [6]
        });
        for (let i = 6; i <= 20; i += 2) {
            this.numberOfCardsOptions.push({ value: i })
        }
        this.subscriptions.push(this.numberOfCardsField.valueChanges.subscribe(val => {
            sessionStorage.setItem('nrOfCards', JSON.stringify(val));
        }));
    }

    startNewGame() {
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
