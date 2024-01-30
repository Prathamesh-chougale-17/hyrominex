"use client"
import React from 'react'
import RoutingMachine from '../RoutingMachine'
import Truck from "../../../public/truck.png";
import Image from "next/image";
import { Circle, Marker, Popup } from "react-leaflet";
import { Icon, LatLngExpression } from 'leaflet';

const costumIcon = new Icon({
    iconUrl: "/marker.png",
    iconSize: [25, 25],
  });
const Exp1 = () => {
    const [position, setPosition] = React.useState<LatLngExpression>([
        16.654543, 73.761443,
      ]);
  return (
    <>
    {/* <LeafletGeocode position={position} /> */}
    <RoutingMachine position={position} />
    <Circle center={position} radius={200}>
      <Marker position={position} icon={costumIcon}>
        <Popup>
          <Image
            src={Truck}
            alt="user image"
            width={130}
            height={130}
          />
          <br />
          {"Anonomous Driver"}
        </Popup>
      </Marker>
    </Circle>
  </>
  )
}

export default Exp1