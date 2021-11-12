<template>
  <div id="viewDiv">

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
        "esri/widgets/Popup"
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
        Popup
      ]) => {
        let spatialReference = SpatialReference.WebMercator;

        let tileInfo = new TileInfo({
          dpi: 90.71428571427429,
          lods: [{
            level: 0,
            scale: 591657527.591555,
            resolution: 156543.033928
          },
          {
            level: 1,
            scale: 295828763.795777,
            resolution: 78271.5169639999
          },
          {
            level: 2,
            scale: 147914381.897889,
            resolution: 39135.7584820001
          },
          {
            level: 3,
            scale: 73957190.948944,
            resolution: 19567.8792409999
          },
          {
            level: 4,
            scale: 36978595.474472,
            resolution: 9783.93962049996
          },
          {
            level: 5,
            scale: 18489297.737236,
            resolution: 4891.96981024998
          },
          {
            level: 6,
            scale: 9244648.868618,
            resolution: 2445.98490512499
          },
          {
            level: 7,
            scale: 4622324.434309,
            resolution: 1222.99245256249
          },
          {
            level: 8,
            scale: 2311162.217155,
            resolution: 611.49622628138
          },
          {
            level: 9,
            scale: 1155581.108577,
            resolution: 305.748113140558
          },
          {
            level: 10,
            scale: 577790.554289,
            resolution: 152.874056570411
          },
          {
            level: 11,
            scale: 288895.277144,
            resolution: 76.4370282850732
          },
          {
            level: 12,
            scale: 144447.638572,
            resolution: 38.2185141425366
          },
          {
            level: 13,
            scale: 72223.819286,
            resolution: 19.1092570712683
          },
          {
            level: 14,
            scale: 36111.909643,
            resolution: 9.55462853563415
          },
          {
            level: 15,
            scale: 18055.954822,
            resolution: 4.77731426794937
          },
          {
            level: 16,
            scale: 9027.977411,
            resolution: 2.38865713397468
          },
          {
            level: 17,
            scale: 4513.988705,
            resolution: 1.19432856685505
          },
          {
            level: 18,
            scale: 2256.994353,
            resolution: 0.597164283559817
          },
          {
            level: 19,
            scale: 1128.497176,
            resolution: 0.298582141647617
          }],
          size: [256, 256],
          origin: {
            x: -20037508.342787,
            y: 20037508.342787
          },
          spatialReference
        });

        // 矢量
        let webTileLayers = new WebTileLayer({
          urlTemplate:"http://{subDomain}.tianditu.com/vec_w/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=vec&STYLE=default&FORMAT=tiles&TILEMATRIXSET=w&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=56d71a543d1e09fe44ba607f9f4d90bf",
          subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
          tileInfo: tileInfo,
          spatialReference
        });
        
        // // 矢量标记
        let webTileLayerBJ = new WebTileLayer({
          urlTemplate: "http://{subDomain}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=56d71a543d1e09fe44ba607f9f4d90bf",
          subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
          tileInfo: tileInfo,
          spatialReference
        });
        
        // 影像
        let ImgTileLayer = new WebTileLayer({
          urlTemplate:"http://{subDomain}.tianditu.com/img_w/wmts?SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetTile&LAYER=img&STYLE=default&FORMAT=tiles&TILEMATRIXSET=w&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=56d71a543d1e09fe44ba607f9f4d90bf",
          subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
          tileInfo: tileInfo,
          spatialReference
        });

        // 影像标记
        let ImgTileLayerBJ = new WebTileLayer({
          urlTemplate: "http://{subDomain}.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=56d71a543d1e09fe44ba607f9f4d90bf",
          subDomains: ["t0", "t1", "t2", "t3", "t4", "t5", "t6", "t7"],
          tileInfo: tileInfo,
          spatialReference
        });

        // 初始
        let basemap = new Basemap({
          baseLayers: [webTileLayers, webTileLayerBJ],
        });

        let SLbasemap = new Basemap({
          baseLayers: [webTileLayers, webTileLayerBJ],
          title:"矢量地图",
          thumbnailUrl:require('../assets/MapImage/m1.jpg')
        });

        let YXbasemap = new Basemap({
          baseLayers: [ImgTileLayer, ImgTileLayerBJ],
          title:"影像地图",
          thumbnailUrl:require('../assets/MapImage/m2.jpg')
        });

        let map = new Map({
          basemap,
          // ground: "world-elevation",
          option: {
            logo: false
          }
        });

        let view = new MapView({
          map:map,
          container: "viewDiv",
          center: [104.072619,30.663776],
          zoom: 4,
        });

        // // 贴图
        let layer = new MapImageLayer({
          url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer"
        });

        setTimeout(() => {
          map.add(layer);  // adds the layer to the map
        }, 10000);
        
        // 地图切换
        let basemapGallery = new BasemapGallery({
          source: [ SLbasemap, YXbasemap ],
          view: view,
        });

        view.ui.add(basemapGallery,{ position: 'top-right' });

        // 生成自定义按钮
        let html = '<button id="mapbtn" style="position: absolute;left:50px;bottom:50px;">地图按钮</button>';
        domConstruct.place(html, view.container, "last");
        
        let mapbtn = document.getElementById("mapbtn");

        on(mapbtn,"click", () => {
          console.log("地图按钮===")
        });



        // FeatureLayer点位layer
        let popupTemplate = {
          title:'Map Modal',
          actions: [{
            id: "search-upperInfo",
          //  image: "images/upperSearch.png",
            title: "上游管道"
          },
          {
            id: "search-lowerInfo",
          //  image: "images/lowerSearch.png",
            title: "下游管道"
        }]
        }
        popupTemplate.content = "<p><span>  天气：</span><span>{WEATHER}</span></p>" + 
                                "<p><span>能见度：</span><span>{VISIBILITY}</span></p>"
        let featurelayer = new FeatureLayer({
          url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/weather_stations_010417/FeatureServer/0",
          popupTemplate:popupTemplate
          // renderer: new SimpleRenderer({
          //   symbol: new SimpleMarkerSymbol({
          //     color: [75, 75, 75, 0.7],
          //     size: 10,
          //     outline:null
          //     // outline: { // 轮廓(类似于border)
          //     //   color: [ 128, 128, 128, 0.5 ],
          //     //   width: "10px"
          //     // },
          //   }),
          // }),
          // labelingInfo: [windClass, cityClass],
        });
        
        map.add(featurelayer);

        // 添加featrelayer点击事件 显示弹出框
        view.on("click",function (evt) {
          view.hitTest(evt).then((response) => {
            var result = response.results[0];
            if(result && result.graphic){
              var graphic = result.graphic;
              //自定义高亮
              //这里的几何图形是面状，配置graphic的symbol为fillSymbol
              graphic.symbol = {
                type: "simple-fill",
                color: "red",
                outline: {
                  color: [128, 128, 128, 0.5],
                  width: "0.5px"
                }
              };
              view.graphics.removeAll(); //清除上一次点击目标
              view.graphics.add(graphic); //添加新的点击目标
            }
          })
        })

        // popupTemplate actions 方法
        view.popup.on("trigger-action", (event) => {
        // Execute the measureThis() function if the measure-this action is clicked
          if (event.action.id === "search-upperInfo") {
            view.popup.content = '<p style="color:red;">显示隐藏内容</p>';
            // 可放置函数调用
          }
        });


        // 添加featrelayer点击事件
        // view.on("click",function (event) {
        //   console.log("+",event)
        //   let layers = map.findLayerById(featurelayer.id)
        //   // 创建查询对象
        //   let query = layers.createQuery()
        //   // 将点击的点放入查询对象中
        //   query.geometry = {
        //     type: 'point', // autocasts as new Point()
        //     longitude: event.mapPoint.longitude,
        //     latitude: event.mapPoint.latitude
        //   }
        //   // 设置缓冲区
        //   query.distance = 6
        //   // 设置查询方式（相交）
        //   query.spatialRelationship = 'intersects'
        //   console.log(query)
        //   let a = layers.queryFeatures(query).then((res) => {
        //     // 得到features对象
        //     console.log(res.features)
        //   })
        // })
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import 'http://192.168.1.50/4.16/esri/themes/light/main.css';

html,
body,
#viewDiv {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}

</style>
