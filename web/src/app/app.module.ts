import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { AbmModule } from 'angular-baidu-maps';
import { NgxEchartsModule } from 'ngx-echarts';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { MonitorComponent } from './monitor/monitor.component';
import { HistoryComponent } from './history/history.component';
import { PositionComponent } from './position/position.component';
import { ControlComponent } from './control/control.component';

@NgModule({
  declarations: [
    AppComponent,
    MonitorComponent,
    HistoryComponent,
    PositionComponent,
    ControlComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgZorroAntdModule.forRoot(),
    NgxEchartsModule,
    AbmModule.forRoot({apiKey: 'GcKVAPwvrdO2G4HzY9etW8xEIMdX2x6m'}),
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }