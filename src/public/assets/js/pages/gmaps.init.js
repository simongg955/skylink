var map;
document.addEventListener("DOMContentLoaded", function (a) {
  (map = new GMaps({
    div: "#gmaps-markers",
    lat: -12.043333,
    lng: -77.028333,
  })).addMarker({
    lat: -12.043333,
    lng: -77.03,
    title: "Lima",
    details: { database_id: 42, author: "HPNeo" },
    click: function (a) {
      console.log && console.log(a), alert("You clicked in this marker");
    },
  }),
    (map = new GMaps({
      div: "#gmaps-overlay",
      lat: -12.043333,
      lng: -77.028333,
    })).drawOverlay({
      lat: map.getCenter().lat(),
      lng: map.getCenter().lng(),
      content:
        '<div class="gmaps-overlay">Lima<div class="gmaps-overlay_arrow above"></div></div>',
      verticalAlign: "top",
      horizontalAlign: "center",
    }),
    (map = GMaps.createPanorama({
      el: "#panorama",
      lat: 42.3455,
      lng: -71.0983,
    })),
    (map = new GMaps({
      div: "#gmaps-types",
      lat: -12.043333,
      lng: -77.028333,
      mapTypeControlOptions: {
        mapTypeIds: ["hybrid", "roadmap", "satellite", "terrain", "osm"],
      },
    })).addMapType("osm", {
      getTileUrl: function (a, e) {
        return (
          "https://a.tile.openstreetmap.org/" +
          e +
          "/" +
          a.x +
          "/" +
          a.y +
          ".png"
        );
      },
      tileSize: new google.maps.Size(256, 256),
      name: "OpenStreetMap",
      maxZoom: 18,
    }),
    map.setMapTypeId("osm");
});
