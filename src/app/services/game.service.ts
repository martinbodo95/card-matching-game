import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GameService{
    private gameResetStateSource = new Subject();
    public gameResetStateSource$ = this.gameResetStateSource.asObservable();

    constructor(private router: Router) {}

    startNewGame() {
        sessionStorage.setItem('activeGame', 'true');
        sessionStorage.setItem('firstCardIndex', '-1');
        sessionStorage.setItem('tries', '0');
        sessionStorage.removeItem('firstCardToCompare');
        sessionStorage.removeItem('firstCardIndex');
        this.router.navigate(['game']);
        this.gameResetStateSource.next();
    }
}