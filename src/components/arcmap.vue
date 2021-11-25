<template>
  <div class="arcmap">
    <div id="viewDiv"></div>
    <button class="ShowGraphic">显示Graphic</button>
    <button class="HideGraphic">隐藏Graphic</button>
    <button class="draw_line">画线</button>
    <button class="draw_flat">画面</button>
  </div>
</template>

<script>
import * as esriLoader from "esri-loader";
export default {
  name: 'arcmap',
  data () {
    return {

    }
  },
  mounted(){
    this.infoMapView()
  },
  methods:{
    infoMapView(){
      const options = { url: "http://192.168.1.50/4.16/dojo/dojo.js" };
      esriLoader.loadModules([
        "esri/Map", 
        "esri/views/MapView", 
        "esri/Basemap", 
        "esri/layers/WebTileLayer", 
        "esri/layers/support/TileInfo", 
        "esri/geometry/SpatialReference", 
        "esri/layers/MapImageLayer",
        "esri/widgets/BasemapGallery",
        "dojo/dom-construct",
        "dojo/on",
        "esri/layers/FeatureLayer",
        "esri/renderers/SimpleRenderer",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/widgets/Popup",
        "esri/views/draw/Draw",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
        "esri/geometry/Polyline",
        "esri/geometry/Polygon",
        "esri/identity/IdentityManager",
        "esri/layers/TileLayer"
      ], (options)
      ).then(([
        Map, 
        MapView, 
        Basemap, 
        WebTileLayer, 
        TileInfo, 
        SpatialReference, 
        MapImageLayer,
        BasemapGallery,
        domConstruct,
        on,
        FeatureLayer,
        SimpleRenderer,
        SimpleMarkerSymbol,
        Popup,
        Draw, // 绘制点 线
        Graphic,
        GraphicsLayer,
        Polyline,
        Polygon,
        IdentityManager,
        TileLayer
      ]) => {
        // let spatialReference = SpatialReference.WebMercator;

        // let tileInfo = new TileInfo({
        //   dpi: 90.71428571427429,
        //   lods: [{
        //     level: 0,
        //     scale: 591657527.591555,
        //     resolution: 156543.033928
        //   },
        //   {
        //     level: 1,
        //     scale: 295828763.795777,
        //     resolution: 78271.5169639999
        //   },
        //   {
        //     level: 2,
        //     scale: 147914381.897889,
        //     resolution: 39135.7584820001
        //   },
        //   {
        //     level: 3,
        //     scale: 73957190.948944,
        //     resolution: 19567.8792409999
        //   },
        //   {
        //     level: 4,
        //     scale: 36978595.474472,
        //     resolution: 9783.93962049996
        //   },
        //   {
        //     level: 5,
        //     scale: 18489297.737236,
        //     resolution: 4891.96981024998
        //   },
        //   {
        //     level: 6,
        //     scale: 9244648.868618,
        //     resolution: 2445.98490512499
        //   },
        //   {
        //     level: 7,
        //     scale: 4622324.434309,
        //     resolution: 1222.99245256249
        //   },
        //   {
        //     level: 8,
        //     scale: 2311162.217155,
        //     resolution: 611.49622628138
        //   },
        //   {
        //     level: 9,
        //     scale: 1155581.108577,
        //     resolution: 305.748113140558
        //   },
        //   {
        //     level: 10,
        //     scale: 577790.554289,
        //     resolution: 152.874056570411
        //   },
        //   {
        //     level: 11,
        //     scale: 288895.277144,
        //     resolution: 76.4370282850732
        //   },
        //   {
        //     level: 12,
        //     scale: 144447.638572,
        //     resolution: 38.2185141425366
        //   },
        //   {
        //     level: 13,
        //     scale: 72223.819286,
        //     resolution: 19.1092570712683
        //   },
        //   {
        //     level: 14,
        //     scale: 36111.909643,
        //     resolution: 9.55462853563415
        //   },
        //   {
        //     level: 15,
        //     scale: 18055.954822,
        //     resolution: 4.77731426794937
        //   },
        //   {
        //     level: 16,
        //     scale: 9027.977411,
        //     resolution: 2.38865713397468
        //   },
        //   {
        //     level: 17,
        //     scale: 4513.988705,
        //     resolution: 1.19432856685505
        //   },
        //   {
        //     level: 18,
        //     scale: 2256.994353,
        //     resolution: 0.597164283559817
        //   },
        //   {
        //     level: 19,
        //     scale: 1128.497176,
        //     resolution: 0.298582141647617
        //   }],
        //   size: [256, 256],
        //   origin: {
        //     x: -20037508.342787,
        //     y: 20037508.342787
        //   },
        //   spatialReference
        // });

        // // 矢量
        // let webTileLayers = new WebTileLayer({
        //   urlTemplate:"http://{subDomain}.tianditu.com/vec_w/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=vec&STYLE=default&FORMAT=tiles&TILEMATRIXSET=w&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=56d71a543d1e09fe44ba607f9f4d90bf",
        //   subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
        //   tileInfo: tileInfo,
        //   spatialReference
        // });
        
        // // // 矢量标记
        // let webTileLayerBJ = new WebTileLayer({
        //   urlTemplate: "http://{subDomain}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=56d71a543d1e09fe44ba607f9f4d90bf",
        //   subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
        //   tileInfo: tileInfo,
        //   spatialReference
        // });
        
        // // 影像
        // let ImgTileLayer = new WebTileLayer({
        //   urlTemplate:"http://{subDomain}.tianditu.com/img_w/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=img&STYLE=default&FORMAT=tiles&TILEMATRIXSET=w&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=56d71a543d1e09fe44ba607f9f4d90bf",
        //   subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
        //   tileInfo: tileInfo,
        //   spatialReference
        // });

        // // 影像标记
        // let ImgTileLayerBJ = new WebTileLayer({
        //   urlTemplate: "http://{subDomain}.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=56d71a543d1e09fe44ba607f9f4d90bf",
        //   subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
        //   tileInfo: tileInfo,
        //   spatialReference
        // });

        // // 初始
        // let basemap = new Basemap({
        //   baseLayers: [webTileLayers, webTileLayerBJ],
        // });

        // let SLbasemap = new Basemap({
        //   baseLayers: [webTileLayers, webTileLayerBJ],
        //   title:"矢量地图",
        //   thumbnailUrl:require('../assets/MapImage/m1.jpg')
        // });

        // let YXbasemap = new Basemap({
        //   baseLayers: [ImgTileLayer, ImgTileLayerBJ],
        //   title:"影像地图",
        //   thumbnailUrl:require('../assets/MapImage/m2.jpg')
        // });

        // let map = new Map({
        //   basemap,
        //   // ground: "world-elevation",
        //   option: {
        //     logo: false
        //   }
        // });

        // let view = new MapView({
        //   map:map,
        //   container: "viewDiv",
        //   center: [104.072619,30.663776],
        //   zoom: 4,
        // });

        // // // 贴图
        // let layer = new MapImageLayer({
        //   url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer"
        // });

        // setTimeout(() => {
        //   map.add(layer);  // adds the layer to the map
        // }, 10000);
        
        // // 地图切换
        // let basemapGallery = new BasemapGallery({
        //   source: [ SLbasemap, YXbasemap ],
        //   view: view,
        // });

        // view.ui.add(basemapGallery,{ position: 'top-right' });

        // // 生成自定义按钮
        // let html = '<button id="mapbtn" style="position: absolute;left:50px;bottom:50px;">地图按钮</button>';
        // domConstruct.place(html, view.container, "last");
        
        // let mapbtn = document.getElementById("mapbtn");

        // on(mapbtn,"click", () => {
        //   console.log("地图按钮===")
        // });



        // // FeatureLayer点位layer
        // let popupTemplate = {
        //   title:'Map Modal',
        //   actions: [{
        //     id: "search-upperInfo",
        //   //  image: "images/upperSearch.png",
        //     title: "上游管道"
        //   },
        //   {
        //     id: "search-lowerInfo",
        //   //  image: "images/lowerSearch.png",
        //     title: "下游管道"
        // }]
        // }
        // popupTemplate.content = "<p><span>  天气：</span><span>{WEATHER}</span></p>" + 
        //                         "<p><span>能见度：</span><span>{VISIBILITY}</span></p>"
        // let featurelayer = new FeatureLayer({
        //   url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/weather_stations_010417/FeatureServer/0",
        //   popupTemplate:popupTemplate
        //   // renderer: new SimpleRenderer({
        //   //   symbol: new SimpleMarkerSymbol({
        //   //     color: [75, 75, 75, 0.7],
        //   //     size: 10,
        //   //     outline:null
        //   //     // outline: { // 轮廓(类似于border)
        //   //     //   color: [ 128, 128, 128, 0.5 ],
        //   //     //   width: "10px"
        //   //     // },
        //   //   }),
        //   // }),
        //   // labelingInfo: [windClass, cityClass],
        // });
        
        // map.add(featurelayer);

        // // 添加featrelayer点击事件 显示弹出框
        // view.on("click",function (evt) {
        //   view.hitTest(evt).then((response) => {
        //     var result = response.results[0];
        //     if(result && result.graphic){
        //       var graphic = result.graphic;
        //       //自定义高亮
        //       //这里的几何图形是面状，配置graphic的symbol为fillSymbol
        //       graphic.symbol = {
        //         type: "simple-fill",
        //         color: "red",
        //         outline: {
        //           color: [128, 128, 128, 0.5],
        //           width: "0.5px"
        //         }
        //       };
        //       view.graphics.removeAll(); //清除上一次点击目标
        //       view.graphics.add(graphic); //添加新的点击目标
        //     }
        //   })
        // })

        // // popupTemplate actions 方法
        // view.popup.on("trigger-action", (event) => {
        // // Execute the measureThis() function if the measure-this action is clicked
        //   if (event.action.id === "search-upperInfo") {
        //     view.popup.content = '<p style="color:red;">显示隐藏内容</p>';
        //     // 可放置函数调用
        //   }
        // });


        // // 添加featrelayer点击事件
        // // view.on("click",function (event) {
        // //   console.log("+",event)
        // //   let layers = map.findLayerById(featurelayer.id)
        // //   // 创建查询对象
        // //   let query = layers.createQuery()
        // //   // 将点击的点放入查询对象中
        // //   query.geometry = {
        // //     type: 'point', // autocasts as new Point()
        // //     longitude: event.mapPoint.longitude,
        // //     latitude: event.mapPoint.latitude
        // //   }
        // //   // 设置缓冲区
        // //   query.distance = 6
        // //   // 设置查询方式（相交）
        // //   query.spatialRelationship = 'intersects'
        // //   console.log(query)
        // //   let a = layers.queryFeatures(query).then((res) => {
        // //     // 得到features对象
        // //     console.log(res.features)
        // //   })
        // // })


        // // Graphic 生成要素（点要素，线要素，面要素。）-----------------------------------------------------------
        // let polyline = {
        //   type: "polyline",  // autocasts as new Polyline()
        //     paths: [
        //       [100.30, 35.68],
        //       [-98, 49.5],
        //       [-93.94, 29.89]
        //     ]
        // };

        // let polylineSymbol = {
        //   type: "simple-line",  // autocasts as SimpleLineSymbol()
        //   color: [226, 119, 40],
        //   width: 2
        // };

        // let polylineGraphic = new Graphic({
        //   geometry: polyline,
        //   symbol: polylineSymbol,
        // });

        // document.querySelector(".ShowGraphic").onclick = () =>{
        //   view.graphics.add(polylineGraphic);
        // }
        // document.querySelector(".HideGraphic").onclick = () =>{
        //   view.graphics.remove(polylineGraphic);
        // }

        // // Draw 绘制要素-------------------------------------------------------------------
        // let draw = new Draw({
        //   view:view
        // });

        // // 画线
        // document.querySelector(".draw_line").onclick = () => {
        //   view.graphics.removeAll();//绘画之前 清除之前的绘制
        //   enableCreateLine(draw,view)
        // };
        
        // //开始监听画线
        // function enableCreateLine(draw, view) {
        //   var action = draw.create("polyline", {
        //     mode: "hybrid"|"freehand"|"click"
        //   });

        //   // 获取焦点
        //   view.focus();

        //   action.on([
        //     "vertex-add",// 顶点添加
        //     "vertex-remove",//顶点移除
        //     "cursor-update", // 鼠标移动
        //     "redo",
        //     "undo",
        //     "draw-complete"// 绘制完成
        //   ],createPolyline)
        // };

        // //根据点坐标生成新的线
        // function createPolyline(event) {
        //     //获取所有顶点
        //     var vertices = event.vertices;
        //     // //清除之前绘制
        //     view.graphics.removeAll();
        //     // 生成绘制的图形
        //     var graphic = new Graphic({
        //         geometry: new Polyline({
        //             paths: vertices,
        //             spatialReference: view.spatialReference
        //         }),
        //         symbol: {
        //             type: "simple-line", // autocasts as new SimpleFillSymbol
        //             color: [55, 105, 75],
        //             width: 4,
        //             cap: "round",
        //             join: "round"
        //         }
        //     });
        //    // 将绘制的图形添加到view
        //   view.graphics.add(graphic);
        // };

        // // 画面
        // document.querySelector(".draw_flat").onclick = () => {
        //   view.graphics.removeAll();//绘画之前 清除之前的绘制
        //   enableCreateArea(draw,view)
        // }
        // function enableCreateArea (draw,view){
        //   var action = draw.create("polygon",{
        //     mode:"click"
        //   })
        //   // 获取焦点
        //   view.focus();
          
        //   action.on([
        //     "vertex-add",// 顶点添加
        //     "vertex-remove",//顶点移除
        //     "cursor-update", // 鼠标移动
        //     "redo",
        //     "undo",
        //     "draw-complete"// 绘制完成
        //   ],createPolygon)
        // }
        // function createPolygon (event){

        //     //获取所有顶点
        //     var vertices = event.vertices;
        //     //清除之前绘制
        //     view.graphics.removeAll();
        //     // 生成绘制的图形
        //     var graphic = new Graphic({
        //         geometry: new Polygon({
        //             hasZ: false,
        //             hasM: false,
        //             rings: [vertices],
        //             spatialReference: view.spatialReference
        //         }),
        //         symbol: {
        //             type: "simple-fill",  // autocasts as new SimpleFillSymbol()
        //             color: [ 51,51, 204, 0.9 ],
        //             style: "solid",
        //             outline: {  // autocasts as new SimpleLineSymbol()
        //                 color: "white",
        //                 width: 1
        //             }
        //         }
        //     });
        //     // 将绘制的图形添加到view
        //     view.graphics.add(graphic);
        // }




        let map = new Map({
          // basemap: 'oceans'
        });

        let view = new MapView({
          container : 'viewDiv',
          map: map,
          zoom: 1
        });

        IdentityManager.registerToken({
          server: "http://10.67.2.57:6080/arcgis/rest/services",
          token: "ujWpPr4U4fhNYbQj3ab7K9bkNkQm02XS4BHL7rVhj5JB3H931JRTKuKXoFmF5Jac1Vi0U6NICsPlnG0YZvXPog.."
        });

        let titlelayers = new TileLayer({
          url: "http://10.67.2.57:6080/arcgis/rest/services/dxt/slyt_dxt/MapServer",
        });

        let ImageLayer1 = new MapImageLayer({
          url: "http://10.67.2.57:6080/arcgis/rest/services/szgx/szgx/MapServer",
          // sublayers: [ // 设置级别显示
          //   {
          //     id: 6,
          //     visible: false
          //   },
          //   {
          //     id: 5,
          //     visible: true
          //   },
          //   {
          //     id: 4,
          //     visible: true
          //   },
          //   {
          //     id: 3,
          //     visible: true
          //   }, {
          //     id: 2,
          //     visible: true
          //   }, {
          //     id: 1,
          //     visible: true
          //   }, {
          //     id: 0,
          //     visible: true,
          //     definitionExpression: "pop2000 > 100000"
          //   }
          // ]
        });
        let ImageLayer2 = new MapImageLayer({
          url: "http://10.67.2.57:6080/arcgis/rest/services/you/MapServer?bbox:20536448.265075996%2C4128601.6052061617%2C20791462.139816597%2C4191057.099079758&bboxSR:21420&dpi:96&f:image&format:png8&imageSR:21420&layers:show%3A0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C8%2C9%2C10%2C11%2C12%2C13%2C14%2C15%2C16%2C17%2C18%2C19%2C20%2C21%2C22%2C23%2C24%2C25%2C26%2C27&size:1670%2C409&transparent:true",
        });
        
        map.add(titlelayers);  // adds the layer to the map
        map.add(ImageLayer1);  // adds the layer to the map
        map.add(ImageLayer2);  // adds the layer to the map

      })
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import 'http://192.168.1.50/4.16/esri/themes/light/main.css';

.arcmap{
  width: 100%;
  height: 100%;
}
html,body,#viewDiv {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  background-color:#000;
}

.ShowGraphic,
.HideGraphic,
.draw_line,
.draw_flat{
  position: absolute;
  top: 50px;
}
.ShowGraphic{
  left: 50px;
}
.HideGraphic{
  left: 180px;
}
.draw_line{
  left: 300px;
}
.draw_flat{
  left: 380px;
}
</style>
