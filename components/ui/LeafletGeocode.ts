import { Icon, Marker, polygon } from "leaflet";
import React from "react";
import { useMap } from "react-leaflet";
import { geocoder } from 'leaflet-control-geocoder';

const LeafletGeocode = () => {

    const costumIcon = new Icon({
        iconUrl: "/marker.png",
        iconSize: [25, 25],
    });
    const map = useMap();
    React.useEffect(() => {
        geocoder({ defaultMarkGeocode: false }).on('markgeocode', function (e: {
            geocode: {
                name: string,
                center: any; bbox: any;
            };
        }) {
            var latlng = e.geocode.center;
            new Marker(latlng).addTo(map).bindPopup(e.geocode.name).openPopup().setIcon(costumIcon).dragging?.enable();
            map.fitBounds(e.geocode.bbox);
        }).addTo(map);
    }, [])
    return null;
}
export default LeafletGeocode;