import { NgZone, OnDestroy } from '@angular/core';
import { Component, OnInit, ViewEncapsulation, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AbmComponent } from 'angular-baidu-maps';
declare const BMap: any;
declare const BMAP_SATELLITE_MAP: any;

class Point{
  jingdu:number;
  weidu:number
}

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit {
  options: any = {}
  status: string = '';
  @ViewChild('map') mapComp: AbmComponent;
  points:Point[] = [
    {jingdu:113.362771,weidu:23.168254},

    {jingdu:113.352961,weidu:23.160181}
  ]

  constructor(private el: ElementRef, private zone: NgZone) { }

  private _map: any;
  onReady(map: any) {
    this._map = map;
    this.points.forEach(p => {
      var point = new BMap.Point(p.jingdu, p.weidu)
      map.centerAndZoom(point, 15);
      map.addControl(new BMap.MapTypeControl());
      var marker = new BMap.Marker(point)
      map.addOverlay(marker)
    });

    map.enableScrollWheelZoom(true);
    this.status = '加载完成';
    //添加监听事件
    map.addEventListener('tilesloaded', () => {
      this.status = '地图加载完毕';
    });
    map.addEventListener('click', this._click.bind(this));
  }

  _click(e: any) {
    this.status = `${e.point.lng}, ${e.point.lat}, ${+new Date}`;
  }

  panTo() {
    this._map.panTo(new BMap.Point(113.362771,23.168254));
  }

  zoom() {
    this._map.setZoom((this._map.getZoom() + 1) % 17);
  }

  infoWindow() {
    let infoWin = new BMap.InfoWindow("地址：北京市东城区王府井大街88号乐天银泰百货八层", {
      width: 200,     // 信息窗口宽度
      height: 100,     // 信息窗口高度
      title: "海底捞王府井店", // 信息窗口标题
      enableMessage: true,//设置允许信息窗发送短息
      message: "亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
    });
    this._map.openInfoWindow(infoWin, this._map.getCenter());
  }

  // 卫星
  satelliteOptions: any;
  private mapSatellite: any;
  onReadySatellite(map: any) {
    map.centerAndZoom(new BMap.Point(113.362771,23.168254), 5);
    map.setMapType(BMAP_SATELLITE_MAP);
    this.mapSatellite = map;
  }

  ngOnDestroy(): void {
    this._map.removeEventListener('click', this._click.bind(this));
  }

  ngOnInit() { }
}
