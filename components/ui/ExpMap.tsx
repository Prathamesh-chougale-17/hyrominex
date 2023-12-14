"use client";
import React, { use, useEffect } from "react";
import dynamic from "next/dynamic";
import Truck from "../../public/truck.png";
//revatidate the code

// Dynamically import the components from 'react-leaflet'
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
import { Icon, LatLngExpression } from "leaflet";
import { useSession } from "next-auth/react";
import Image from "next/image";
const LeafMap = () => {
  const [position, setPosition] = React.useState<LatLngExpression>([
    16.654543, 73.761443,
  ]);
  const sendLiveLocation = async (
    userId: string,
    latitude: number,
    longitude: number
  ) => {
    try {
      await fetch("/api/location", {
        method: "POST",
        body: JSON.stringify({
          userId,
          latitude,
          longitude,
        }),
      }).then((Response) => {
        // (Response.status);
        console.log(Response.body);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateLiveLocation = async (
    userId: string,
    latitude: number,
    longitude: number
  ) => {
    try {
      await fetch(`/api/location/${userId}`, {
        method: "PUT",
        body: JSON.stringify({
          userId,
          latitude,
          longitude,
        }),
      }).then((Response) => {
        // (Response.status);
        console.log("PUT");
      });
    } catch (error) {
      console.log(error);
    }
  };
  const { data: session } = useSession();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setPosition([latitude, longitude]);
      if (session?.user?.email) {
        sendLiveLocation(session?.user?.email!, latitude, longitude);
      }
    });
  }, [session?.user?.email]);
  setTimeout(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setPosition([latitude, longitude]);
      if (session?.user?.email) {
        updateLiveLocation(session?.user?.email!, latitude, longitude);
      }
    });
  }, 1000);

  const costumIcon = new Icon({
    iconUrl: "/marker.png",
    iconSize: [25, 25],
  });

  return (
    <div>
      {/* <button onClick={handleButtonClick}>Get Geolocation</button> */}
      <MapContainer center={position} zoom={13} style={{ height: "600px" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position} icon={costumIcon}>
          <Popup>
            <Image
              src={session?.user?.image || Truck}
              alt="user iamge"
              width={130}
              height={130}
            />
            <br />
            {session?.user?.name || "Anonomous Driver"}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default LeafMap;
