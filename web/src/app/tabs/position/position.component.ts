import { NgZone, OnDestroy } from '@angular/core';
import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { MapOptions, Point, ScaleControlOptions, ControlAnchor, NavigationControlOptions, OverviewMapControlOptions, MapTypeControlOptions, NavigationControlType, MapTypeControlType } from 'angular2-baidu-map';

import { Device } from '../..//bean/device';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css'],
})
export class PositionComponent implements OnInit {
  options: MapOptions;
  selectedDevice: Device;
  point: Point;
  controlOpts: NavigationControlOptions
  overviewmapOpts: OverviewMapControlOptions
  scaleOpts: ScaleControlOptions
  mapTypeOpts: MapTypeControlOptions

  constructor(private deviceService: DeviceService) {
    this.controlOpts = {
      anchor: ControlAnchor.BMAP_ANCHOR_TOP_LEFT,
      type: NavigationControlType.BMAP_NAVIGATION_CONTROL_SMALL,
      showZoomInfo:true
    }
    
    this.scaleOpts = {
      anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_LEFT
    }

    this.mapTypeOpts = {
      type: MapTypeControlType.BMAP_MAPTYPE_CONTROL_HORIZONTAL
    }

    this.selectedDevice = this.deviceService.getSelectedDevice()
    this.options = {
      centerAndZoom: {
        lat: this.selectedDevice.lat,
        lng: this.selectedDevice.lon,
        zoom: 16
      },
      enableKeyboard: true,
    }
    this.point = {
      lat: this.selectedDevice.lat,
      lng: this.selectedDevice.lon,
    }
    
    this.deviceService.selectedDevice$.subscribe(
      device => {
        this.selectedDevice = device
        this.options = {
          centerAndZoom: {
            lat: device.lat,
            lng: device.lon,
            zoom: 16
          }
        }
        this.point = {
          lat: device.lat,
          lng: device.lon
        }
      }
    )

  }

  onScrollDown(){
    console.log("scroll down")
    this.options.centerAndZoom.zoom -= 1
  }

  onScrollUp(){
    console.log("scroll up")
    this.options.centerAndZoom.zoom += 1
  }

  ngOnInit() { }
}
