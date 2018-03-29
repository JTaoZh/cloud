import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MqttMessage, MqttModule, MqttService, MqttServiceOptions } from 'ngx-mqtt';

const MQTT_SERVICE_OPTIONS: MqttServiceOptions = {
  hostname: 'localhost',
  port: 9001,
  path: '/mqtt'
};

function mqttServiceFactory() {
  return new MqttService(MQTT_SERVICE_OPTIONS);
}

@NgModule({
  imports: [
    CommonModule,
    MqttModule.forRoot({provide: MqttService,useFactory: mqttServiceFactory})
  ],
  exports:[],
  declarations: []
})
export class AppMqttModule { }
