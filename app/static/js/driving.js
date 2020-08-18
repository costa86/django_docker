require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/Directions"
], function (Map, MapView, Directions) {

    var map = new Map({
        basemap: "streets-navigation-vector"
    });

    var view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-118.24532, 34.05398],
        zoom: 12,
        padding: {
            right: 320
        }
    });

    let directions = new Directions({
        view: view,
        routeServiceUrl: "https://utility.arcgis.com/usrsvcs/appservices/8DHHInhLHEp9v1Rd/rest/services/World/Route/NAServer/Route_World/"

    });

    view.ui.add(directions, "top-right");

});