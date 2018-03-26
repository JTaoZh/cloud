import { Component } from '@angular/core';
import { Tab, Tabs } from './bean/tab';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  tabs = Tabs
}
