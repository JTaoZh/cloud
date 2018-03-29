import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ControlComponent } from './tabs/control/control.component'
import { HistoryComponent } from './tabs/history/history.component'
import { MonitorComponent } from './tabs/monitor/monitor.component'
import { PositionComponent } from './tabs/position/position.component'

const routes:Routes = [
  {path:'monitor', component:MonitorComponent},
  {path:'history', component:HistoryComponent},
  {path:'position', component:PositionComponent},
  {path:'control', component:ControlComponent}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
