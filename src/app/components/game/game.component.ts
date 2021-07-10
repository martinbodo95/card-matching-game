import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Card } from 'src/app/models/card.model';
import { GameService } from 'src/app/services/game.service';

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent {
    tries = JSON.parse(sessionStorage.getItem('tries')!) || 0;
    best = JSON.parse(sessionStorage.getItem('best')!) || 0;
    nrOfRemainingCardsFromSet = 9;
    activeGame = JSON.parse(sessionStorage.getItem('activeGame')!) || false;
    cards: Card[] = JSON.parse(sessionStorage.getItem('cards')!) || [];
    firstCardToCompare: Card = JSON.parse(sessionStorage.getItem('firstCardToCompare')!) ||
        { id: -1, imgUrl: '', flipped: false, disabled: false };
    firstCardIndex = JSON.parse(sessionStorage.getItem('firstCardIndex')!) || -1;
    cardClickDisabled = false;
    cardset: Card[] = [
        { id: 1, imgUrl: '/assets/cards/angular.png', flipped: false, disabled: false },
        { id: 2, imgUrl: '/assets/cards/d3.png', flipped: false, disabled: false },
        { id: 3, imgUrl: '/assets/cards/jenkins.png', flipped: false, disabled: false },
        { id: 4, imgUrl: '/assets/cards/postcss.png', flipped: false, disabled: false },
        { id: 5, imgUrl: '/assets/cards/react.png', flipped: false, disabled: false },
        { id: 6, imgUrl: '/assets/cards/redux.png', flipped: false, disabled: false },
        { id: 7, imgUrl: '/assets/cards/sass.png', flipped: false, disabled: false },
        { id: 8, imgUrl: '/assets/cards/splendex.png', flipped: false, disabled: false },
        { id: 9, imgUrl: '/assets/cards/ts.png', flipped: false, disabled: false },
        { id: 10, imgUrl: '/assets/cards/webpack.png', flipped: false, disabled: false }
    ];
    nrOfCards = JSON.parse(sessionStorage.getItem('nrOfCards')!) || 6;
    private subscriptions: Subscription[] = [];

    constructor(
        private router: Router,
        private gameService: GameService) {
        if (!this.activeGame) {
            this.setCardsField();
        }
        this.subscriptions.push(this.gameService.gameResetStateSource$.subscribe(() => {
            this.setCardsField();
        }));
    }

    startNewGame() {
        this.gameService.startNewGame();
    }

    setCardsField() {
        this.resetValues();
        let tempCardSetArr = JSON.parse(JSON.stringify(this.cardset));
        for (let i = 0; i < this.nrOfCards / 2; i++) {
            const rn = Math.floor(Math.random() * this.nrOfRemainingCardsFromSet);
            this.cards.push(JSON.parse(JSON.stringify(tempCardSetArr[rn])));
            this.cards.push(JSON.parse(JSON.stringify(tempCardSetArr[rn])));
            this.nrOfRemainingCardsFromSet--;
            tempCardSetArr.splice(rn, 1);
        }
        this.cards.sort((a, b) => Math.random() - 0.5);
        sessionStorage.setItem('activeGame', 'true');
        this.saveCurrentState();
    }

    resetValues() {
        this.cards = [];
        this.tries = 0;
        this.nrOfRemainingCardsFromSet = 9;
        this.firstCardToCompare = { id: -1, imgUrl: '', flipped: false, disabled: false };
        this.firstCardIndex = -1;
        this.nrOfCards = JSON.parse(sessionStorage.getItem('nrOfCards')!) || 6;
    }

    cardClicked(index: number) {
        if (this.cards[index].disabled || this.cardClickDisabled || index === this.firstCardIndex) return;
        if (this.firstCardIndex === -1) {
            this.firstCardToCompare = { id: this.cards[index].id, imgUrl: this.cards[index].imgUrl, flipped: true, disabled: false };
            this.cards[index].flipped = true;
            this.firstCardIndex = index;
        } else {
            this.tries++;
            if (this.firstCardToCompare.id === this.cards[index].id) {
                this.cards[index].flipped = true;
                this.cards[index].disabled = true;
                this.cards[this.firstCardIndex].disabled = true;
                this.firstCardIndex = -1;
                this.firstCardToCompare = { id: -1, imgUrl: '', flipped: false, disabled: false };
                let disabledCounter = 0;
                for (let i = 0; i < this.cards.length; i++) {
                    if (this.cards[i].disabled) disabledCounter++;
                }
                if (disabledCounter === this.cards.length) {
                    this.activeGame = false;
                    sessionStorage.setItem('activeGame', JSON.stringify(this.activeGame));
                    if (this.best === 0 || this.tries < this.best) {
                        sessionStorage.setItem('best', JSON.stringify(this.tries));
                    }
                    this.router.navigate(['']);
                }
            } else {
                this.cards[index].flipped = true;
                this.cardClickDisabled = true;
                setTimeout(() => {
                    this.cards[index].flipped = false;
                    this.cards[this.firstCardIndex].flipped = false;
                    this.firstCardIndex = -1;
                    this.cardClickDisabled = false;
                }, 1500)
            }
        }
        this.saveCurrentState();
    }

    saveCurrentState() {
        sessionStorage.setItem('cards', JSON.stringify(this.cards));
        sessionStorage.setItem('tries', JSON.stringify(this.tries));
        sessionStorage.setItem('firstCardIndex', JSON.stringify(this.firstCardIndex));
        sessionStorage.setItem('firstCardToCompare', JSON.stringify(this.firstCardToCompare));

    }
}
