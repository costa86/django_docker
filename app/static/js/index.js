require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/BasemapToggle",
    "esri/widgets/BasemapGallery",
    "esri/layers/FeatureLayer",
], function (Map, MapView, BasemapToggle, BasemapGallery, FeatureLayer) {

    var map = new Map({
        basemap: "topo-vector"
    });

    var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-118.80500, 34.02700], // longitude, latitude
        zoom: 13
    });

    let street = new BasemapToggle({
        view: view,
        nextBasemap: "streets-navigation-vector"
    });
    let sat = new BasemapToggle({
        view: view,
        nextBasemap: "satellite"
    });

    let gallery = new BasemapGallery({
        view,
        source: {
            portal: {
                url: "https://www.arcgis.com",
                useVectorBasemaps: true  // Load vector tile basemaps
            }
        }
    });

    // Trailheads feature layer (points)
    let trailheadsLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
    });

    // Trails feature layer (lines)
    let trailsLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
        definitionExpression: "ELEV_GAIN < 250",
        renderer: {
            type: "simple",
            symbol: {
                type: "simple-line",
                color: "green",
                width: "2px"
            }
        },
        outFields: ["TRL_NAME", "ELEV_GAIN"],
        popupTemplate: {  // Enable a popup
            title: "{TRL_NAME}", // Show attribute value
            content: "The trail elevation gain is {ELEV_GAIN} ft."  // Display text in pop-up
        }
    });

    // Parks and open spaces (polygons)
    let parksLayer = new FeatureLayer({
        url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0"
    });

    map.add(trailsLayer, 0);
    map.add(parksLayer, 0);
    map.add(trailheadsLayer);

    //view.ui.add([street, sat], "bottom-left");
    view.ui.add(gallery, "top-right");

});