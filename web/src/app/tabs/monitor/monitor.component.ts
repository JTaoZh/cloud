import { Component, OnInit } from '@angular/core';

import { Device } from '../..//bean/device';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {

  selectedDevice:Device;

  constructor(private deviceService:DeviceService){
    this.selectedDevice = this.deviceService.getSelectedDevice()
    this.deviceService.selectedDevice$.subscribe(
      device => this.selectedDevice = device
    )
  }

  ngOnInit() {
 
  }
}
