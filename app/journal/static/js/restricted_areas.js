import { lisbon_1, lisbon_2, lisbon_3 } from "./areas/lisbon.js";

require([
    "esri/Map",
    "esri/views/MapView",
    "esri/Graphic",
    "esri/layers/GraphicsLayer"
], function (Map, MapView, Graphic, GraphicsLayer) {

    var map = new Map({
        basemap: "streets-navigation-vector"
    });

    var view = new MapView({
        container: "viewDiv",
        map: map,
        //center: [-9.1407, 38.7144],
        center: lisbon_1.rings[0],
        zoom: 13
    });

    var graphicsLayer = new GraphicsLayer();
    map.add(graphicsLayer);


    var simpleFillSymbol = {
        type: "simple-fill",
        color: [227, 139, 79, 0.8],  // orange, opacity 80%
        outline: {
            color: [255, 255, 255],
            width: 1
        }
    };

    function createGraph(geo) {
        let graph = new Graphic({
            geometry: geo,
            symbol: simpleFillSymbol
        });
        return graph;
    }

    graphicsLayer.add(createGraph(lisbon_1));
    graphicsLayer.add(createGraph(lisbon_2));
    graphicsLayer.add(createGraph(lisbon_3));

});