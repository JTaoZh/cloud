import { Component } from '@angular/core';
import { Tab, Tabs } from './bean/tab';
import { Device } from './bean/device';
import { DeviceService } from './device.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  tabs = Tabs

  devices:Device[];

  constructor(private deviceService:DeviceService){

  }

  getDevices(){
    this.devices = this.deviceService.getDevices()
  }

  ngOnInit(){
    this.getDevices()
  }
}
