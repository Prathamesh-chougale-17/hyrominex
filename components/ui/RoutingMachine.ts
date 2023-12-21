import { useEffect } from "react";
import L, { LatLngExpression } from "leaflet";
import { useMap } from "react-leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { geocoder } from "leaflet-control-geocoder";

var EndLocation: LatLngExpression = [17.385, 78.4867];
var x: string = ""
const RoutingMachine = ({ position }: { position: LatLngExpression }) => {
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
                    EndLocation = [latlng.lat, latlng.lng];
                    console.log(EndLocation)

                    L.marker(latlng).addTo(map).bindPopup(e.geocode.name).openPopup();

                    map.fitBounds(e.geocode.bbox).dragging.enable();
                    x = e.geocode.name

                }
            )
            .addTo(map);
        //@ts-ignore
        L.Routing.control({
            waypoints: [
                L.latLng(position),
                L.latLng(EndLocation)
            ],
            lineOptions: {
                // styles: [{ color: '#242424', opacity: 1, weight: 2 }]
            },
            routeWhileDragging: false,
            // geocoder: L.Control.Geocoder.nominatim(),
            addWaypoints: false,
            draggableWaypoints: true,
            fitSelectedRoutes: true,
            showAlternatives: true,

        }).addTo(map)
        console.log(x)

    }, [x])
    return null;
}

export default RoutingMachine;