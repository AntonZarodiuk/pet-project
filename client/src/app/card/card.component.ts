import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  models: string[] = ['bugatti', 'chevrolette']
  carModel: string = 'Bugatti';
  warningText: string = ''
 
  ngOnInit(): void {
  };
  
  inputHandler(event: any) {
    const value: string = event.target.value;
    
    this.carModel = value;
  }

  submitInput() {
    if (this.carModel && !this.models.includes(this.carModel.toLowerCase())) {
      this.warningText = 'Error: No such model!'
      return
    }
    this.warningText = ''
    console.log(this.carModel)
  }
}
