import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { SelectInput } from './models/select-input.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    gameForm: FormGroup;
    numberOfCardsOptions: SelectInput[] = [];

    constructor(private formBuilder: FormBuilder) {
        this.gameForm = this.formBuilder.group({
            numberOfCards: [6]
        });
        for (let i = 6; i <= 20; i += 2) {
            this.numberOfCardsOptions.push({ value: i })
        }
    }
    
    get numberOfCards(): number { return this.gameForm.get('numberOfCards')!.value; }


}
