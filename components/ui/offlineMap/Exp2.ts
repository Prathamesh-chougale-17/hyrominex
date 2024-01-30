import React from 'react'
import 'leaflet.locatecontrol' // Import plugin
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css' // Import styles
import L from 'leaflet' // Import L from leaflet to start using the plugin
import { useMap } from 'react-leaflet'
const Exp2 = () => {
    const map = useMap();
    React.useEffect(() => {
        //@ts-ignore
        const lc = L.control.locate({
            position: 'bottomright',
            strings: {
                title: "Show me where I am, yo!"
            }
        }).addTo(map);
        lc.start();
        return () => {
            map.removeControl(lc);
        };
    }, []);
    return null;
}

export default Exp2