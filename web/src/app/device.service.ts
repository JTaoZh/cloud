import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Device } from './bean/device'


const devices:Device[] = [    
  {id:'000101', temp:21.32, humi:14.23, lon:113.362771, lat:23.168254},
  {id:'000201', temp:21.32, humi:14.23, lon:113.352961, lat:23.160181},
]

@Injectable()
export class DeviceService {

  constructor(
    private http:HttpClient,
  ) { }

  getDevices():Device[]{
    return devices;
  }

}
