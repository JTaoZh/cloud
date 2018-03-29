import { Component, OnInit } from '@angular/core';
import { Device } from '../bean/device';
import { DeviceService } from '../services//device.service';

@Component({
  selector: 'device-aside',
  templateUrl: './device-aside.component.html',
  styleUrls: ['./device-aside.component.css']
})
export class DeviceAsideComponent implements OnInit {

  devices:Device[];

  selectedDevice:Device;

  constructor(private deviceService:DeviceService){
    this.selectedDevice = this.deviceService.getSelectedDevice()
  }

  getDevices(){
    this.deviceService.getDevices()
      .subscribe(devices => this.devices = devices)
  }

  ngOnInit(){
    this.getDevices()
  }

  selectDevice(device:Device){
    this.deviceService.select(device)
  }
}
