import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mulipleselectbox',
  templateUrl: './mulipleselectbox.component.html',
  styleUrls: ['./mulipleselectbox.component.css']
})
export class MulipleselectboxComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  name = 'Bakkar';

  list1 = [
    { text: 'item 1', selected: false },
    { text: 'item 2', selected: false },
    { text: 'item 3', selected: false },
    { text: 'item 4', selected: false },
    { text: 'item 5', selected: false }
  ];
  list2 = [
    { text: 'item 6', selected: false },
    { text: 'item 7', selected: false }
  ];

  public toggleSelection(item, list) {
    item.selected = !item.selected;
  }

  public moveSelected(direction) {
    if (direction === 'left') {
      this.list2.forEach(item => {
        if (item.selected) {
          this.list1.push(item);
        }
      });
      this.list2 = this.list2.filter(i => !i.selected);
    } else {
      this.list1.forEach(item => {
        if (item.selected) {
          this.list2.push(item);
        }
      });
      this.list1 = this.list1.filter(i => !i.selected);
    }
  }

  public moveAll(direction) {
    if (direction === 'left') {
      this.list1 = [...this.list1, ...this.list2];
      this.list2 = [];
    } else {
      this.list2 = [...this.list2, ...this.list1];
      this.list1 = [];
    }
  }

}
