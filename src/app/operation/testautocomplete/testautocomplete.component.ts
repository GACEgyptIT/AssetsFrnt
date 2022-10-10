import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-testautocomplete',
  templateUrl: './testautocomplete.component.html',
  styleUrls: ['./testautocomplete.component.css']
})
export class TestautocompleteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  title = "Ngx Angular AutoComplete";
  selected_employee: any ;
  public employees = [
    {
      id: 1,
      name: "Byram",
      gender: "Male"
    },
    {
      id: 2,
      name: "Jeniffer",
      gender: "Female"
    },
    {
      id: 3,
      name: "Gerda",
      gender: "Female"
    },
    {
      id: 4,
      name: "Ferrell",
      gender: "Male"
    },
    {
      id: 5,
      name: "Rowe",
      gender: "Female"
    },
    {
      id: 6,
      name: "Josephine",
      gender: "Female"
    },
    {
      id: 7,
      name: "Alfons",
      gender: "Male"
    },
    {
      id: 8,
      name: "Rycca",
      gender: "Female"
    },
    {
      id: 9,
      name: "Mandy",
      gender: "Female"
    },
    {
      id: 10,
      name: "Bunni",
      gender: "Female"
    },
    {
      id: 11,
      name: "Stepha",
      gender: "Female"
    },
    {
      id: 12,
      name: "Pete",
      gender: "Male"
    },
    {
      id: 13,
      name: "Keary",
      gender: "Male"
    },
    {
      id: 14,
      name: "Esme",
      gender: "Female"
    },
    {
      id: 15,
      name: "Juieta",
      gender: "Female"
    }
  ];

  selectEvent(event) {
    this.selected_employee = JSON.stringify(event)
  }

}
