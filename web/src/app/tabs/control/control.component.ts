import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.css']
})
export class ControlComponent implements OnInit {

  constructor() { }

  valveOn(){
    console.log('valve on')
  }

  valveOff(){
    console.log('valve off')
  }

  getHumiture(){
    console.log('get humiture')
  }

  ngOnInit() {
  }

}
