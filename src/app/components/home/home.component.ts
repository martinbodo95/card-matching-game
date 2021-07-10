import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SelectInput } from 'src/app/models/select-input.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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

  ngOnInit(): void {
  }

}
