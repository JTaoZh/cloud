import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// for mock http data
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './services/in-memory-data.service';

import { NgZorroAntdModule } from 'ng-zorro-antd';
import { BaiduMapModule } from 'angular2-baidu-map';
import { NgxEchartsModule } from 'ngx-echarts';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppMqttModule } from './modules/app-mqtt.module'

import { AppComponent } from './app.component';
import { AppRoutingModule } from './modules/app-routing.module';
import { MonitorComponent } from './tabs/monitor/monitor.component';
import { HistoryComponent } from './tabs/history/history.component';
import { PositionComponent } from './tabs/position/position.component';
import { ControlComponent } from './tabs/control/control.component';
import { DeviceAsideComponent } from './device-aside/device-aside.component';

import { DeviceService } from './services/device.service';

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
    // mock http data for test
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, { dataEncapsulation: false }),
    //mqtt
    AppMqttModule,
    // zorro-antd
    NgZorroAntdModule.forRoot(),
    // echarts
    NgxEchartsModule,
    // baidu map
    BaiduMapModule.forRoot({ak: 'GcKVAPwvrdO2G4HzY9etW8xEIMdX2x6m'}),
    AppRoutingModule
  ],
  bootstrap: [AppComponent],
  providers:[
    DeviceService
  ]
})
export class AppModule { }