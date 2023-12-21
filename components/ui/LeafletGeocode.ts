import L, { Icon, LatLngExpression, Marker } from "leaflet";
import React, { useEffect } from "react";
import { useMap } from "react-leaflet";
import { geocoder } from "leaflet-control-geocoder";

import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import RoutingMachine from "./RoutingMachine";
// var EndLocation: LatLngExpression = [17.3850, 78.4867];
var EndLocation: LatLngExpression = [17.385, 78.4867];
const LeafletGeocode = ({ position }: { position: LatLngExpression }) => {
  const costumIcon = new Icon({
    iconUrl: "/marker.png",
    iconSize: [25, 25],
  });
  const map = useMap();
  useEffect(() => {
    geocoder({ defaultMarkGeocode: false })
      .on(
        "markgeocode",
        function (e: {
          geocode: {
            name: string;
            center: any;
            bbox: any;
          };
        }) {
          var latlng = e.geocode.center;
          // new Marker(latlng)
          //   .addTo(map)
          //   .bindPopup(e.geocode.name)
          //   .openPopup()
          //   .setIcon(costumIcon);
          EndLocation = [latlng.lat, latlng.lng];

          L.marker(latlng).addTo(map).bindPopup(e.geocode.name).openPopup();

          map.fitBounds(e.geocode.bbox);
          // RoutingMachine({ position: position, EndLocation: EndLocation });
        }
      )
      .addTo(map);

    // @ts-ignore
  }, []);
  return null;
};
export default LeafletGeocode;
