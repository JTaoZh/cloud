import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// for mock http data
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BaiduMapModule } from 'angular2-baidu-map';
import { NgxEchartsModule } from 'ngx-echarts';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { MonitorComponent } from './monitor/monitor.component';
import { HistoryComponent } from './history/history.component';
import { PositionComponent } from './position/position.component';
import { ControlComponent } from './control/control.component';

import { DeviceService } from './device.service';
import { DeviceAsideComponent } from './device-aside/device-aside.component';

import { Observable } from 'rxjs/Observable';

import {
  MqttMessage,
  MqttModule,
  MqttService,
  MqttServiceOptions
} from 'ngx-mqtt';

export const MQTT_SERVICE_OPTIONS: MqttServiceOptions = {
  hostname: 'localhost',
  port: 9001,
  path: '/mqtt'
};

export function mqttServiceFactory() {
  return new MqttService(MQTT_SERVICE_OPTIONS);
}


@NgModule({
  declarations: [
    AppComponent,
    MonitorComponent,
    HistoryComponent,
    PositionComponent,
    ControlComponent,
    DeviceAsideComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // for mock http data
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false }),

    MqttModule.forRoot({provide: MqttService,useFactory: mqttServiceFactory}),

    NgZorroAntdModule.forRoot(),
    NgxEchartsModule,
    BaiduMapModule.forRoot({ak: 'GcKVAPwvrdO2G4HzY9etW8xEIMdX2x6m'}),
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
  providers:[
    DeviceService
  ]
})
export class AppModule { }