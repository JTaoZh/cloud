import { Component } from '@angular/core';
import { Tab, Tabs } from './bean/tab';
import { Observable } from 'rxjs/Observable';
import { MqttMessage, MqttService } from 'ngx-mqtt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  tabs = Tabs

  public myOtherMessage$: Observable<MqttMessage>;
  myMessage:string;

  constructor(private _mqttService: MqttService) {
    this.myOtherMessage$ = this._mqttService.observe('my/other/topic');
  }

  public unsafePublish(topic: string, message: string): void {
    this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
  }
}
