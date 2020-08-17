require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/Locate",
    "esri/widgets/Track",
    "esri/Graphic"
], function (Map, MapView, Locate, Track, Graphic) {

    let map = new Map({
        basemap: "streets-navigation-vector"
    });

    let view = new MapView({
        container: "viewDiv",
        map: map,
        center: [-40, 28],
        zoom: 2
    });

    let locate = new Locate({
        view: view,
        useHeadingEnabled: false,
        goToOverride: function (view, options) {
            options.target.scale = 1500;
            return view.goTo(options.target);
        }
    });
    view.ui.add(locate, "top-left");

    let track = new Track({
        view: view,
        graphic: new Graphic({
            symbol: {
                type: "simple-marker",
                size: "12px",
                color: "green",
                outline: {
                    color: "#efefef",
                    width: "1.5px"
                }
            }
        }),
        useHeadingEnabled: false
    });

    view.ui.add(track, "top-left");

});
