"use client"
import dynamic from 'next/dynamic';
import React from 'react'
const MapContainer = dynamic(
    () => import("react-leaflet").then((mod) => mod.MapContainer),
    { ssr: false }
  );
  const Marker = dynamic(
    () => import("react-leaflet").then((mod) => mod.Marker),
    { ssr: false }
  );
  const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
    ssr: false,
  });
  const TileLayer = dynamic(
    () => import("react-leaflet").then((mod) => mod.TileLayer),
    { ssr: false }
  );
    import "leaflet/dist/leaflet.css";
import Image from "next/image";
import { Icon, LatLngExpression } from "leaflet";
const costumIcon = new Icon({
    iconUrl: "/marker.png",
    iconSize: [25, 25],
  });
  
  const position: LatLngExpression = [26.9327201, 75.7849401];
  
  const StationLocation =[ {
    stationName: "Banipark police station",
    latitude: 26.9327201,
    longitude: 75.7849401,
  },
  {
    stationName: "Bhakrota police station",
    latitude: 26.8710779,
    longitude: 75.6979088,
  },
  {
    stationName: "Bindayaka police station",
    latitude: 26.918912499999998,
    longitude: 75.64954689999999,
  },
  {
    stationName: "Chitrakoot police station",
    latitude: 26.899637499999997,
    longitude: 75.7343281,
  },
  {
    stationName: "Chomu police station",
    latitude:  27.164112499999998,
    longitude: 75.7233906,
  },
  {
    stationName: "Daulatpura police station",
    latitude: 27.0828721,
    longitude: 75.833716,
  },
  {
    stationName: "Sikar Rd police station",
    latitude: 27.002654399999997,
    longitude: 75.7687856,
  },
  {
    stationName: "Jhotwara police station",
    latitude: 26.9517365,
    longitude: 75.761532,
  },
  {
    stationName: "Kalwar Rd police station",
    latitude: 26.9759671,
    longitude: 75.61982669999999,
  },
]
const PoliceMap = () => {
  return (
    <div><MapContainer center={position} zoom={13} style={{ height: "600px" }}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
    {StationLocation.map((user) => (
          <Marker
                position={[user.latitude, user.longitude]}
                icon={costumIcon}
                key={user.stationName}
                >
                <Popup>
                <Image
                    src="/newavatar.png"
                    alt="user image"
                    width={130}
                    height={130}
                    />
                    <br />
                    {user.stationName}{" "}
                </Popup>
                </Marker>
        ))}
        {/* <Marker
          position={[user.latitude, user.longitude]}
          icon={costumIcon}
          key={user.userId}
        >
          <Popup>
           <Image
                src="/avatar.png"
                alt="user image"
                width={130}
                height={130}
                />
          </Popup>
        </Marker> */}
  </MapContainer></div>
  )
}

export default PoliceMap