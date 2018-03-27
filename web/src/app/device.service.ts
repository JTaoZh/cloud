import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Device } from './bean/device'
import { Observable, Subject } from 'rxjs';
import { of } from 'rxjs/observable/of';

const devices:Device[] = [    
  {id:'000101', temp:21.32, humi:14.23, lon:113.362771, lat:23.168254},
  {id:'000201', temp:21.32, humi:14.23, lon:113.352961, lat:23.160181},
]

@Injectable()
export class DeviceService {

  selectedDevice:Device;
  selectedDeviceSource = new Subject<Device>()
  selectedDevice$ = this.selectedDeviceSource.asObservable()

  select(device:Device){
    this.selectedDeviceSource.next(device)
    this.selectedDevice = device
  }

  constructor() { 
    this.selectedDevice = devices[0]
  }

  getDevices():Observable<Device[]>{
    return of(devices)
  }

  getSelectedDevice(){
    return this.selectedDevice
  }
}
