"use client";
import React, { useEffect } from "react";
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
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
// import "leaflet-control-geocoder/dist/Control.Geocoder.js";

import "leaflet/dist/leaflet.css";
import { Icon, LatLngExpression } from "leaflet";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Circle } from "react-leaflet";
import RoutingMachine from "./RoutingMachine";

import L from "leaflet";
import Exp1 from "./offlineMap/Exp1";
import Exp2 from "./offlineMap/Exp2";

const costumIcon = new Icon({
  iconUrl: "/marker.png",
  iconSize: [25, 25],
});

L.Marker.prototype.options.icon = costumIcon;

const GetData = async () => {
  try {
    const res = await fetch("/api/location", { cache: "no-cache" });
    if (!res.ok) {
      throw new Error("Not Found");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
const sendLiveLocation = async (
  userId: string,
  latitude: number,
  longitude: number,
  image: string,
  name: string
) => {
  try {
    await fetch("/api/location", {
      method: "POST",
      body: JSON.stringify({
        userId,
        latitude,
        longitude,
        image,
        name,
      }),
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
    });
  } catch (error) {
    console.log(error);
  }
};


interface Users {
  userId: string;
  name: string;
  latitude: number;
  longitude: number;
  image: string;
}
const LeafMap = () => {
  //live location
  const [latitude, setLatitude] = React.useState(0);
  const [longitude, setLongitude] = React.useState(0);
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);
  const [position, setPosition] = React.useState<LatLngExpression>([
    latitude,longitude
  ]);
  const [users, setUsers] = React.useState<Users[]>([]);
  const [loading, setLoading] = React.useState(true);
  const { data: session } = useSession();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setPosition([latitude, longitude]);
      if (session?.user?.email) {
        sendLiveLocation(
          session?.user?.email!,
          latitude,
          longitude,
          session?.user?.image!,
          session?.user?.name!
        );
      }
    });
  }, [session?.user?.email]);
  navigator.geolocation.watchPosition((position) => {
    const { latitude, longitude } = position.coords;
    setPosition([latitude, longitude]);
    if (session?.user?.email) {
      updateLiveLocation(session?.user?.email!, latitude, longitude);
    }
  });

  useEffect(() => {
    const getData = async () => {
      const data = await GetData();
      setUsers(data);
      console.log(data);
      setLoading(false);
    };
    getData();
  }, [position]);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="-z-10">
      <MapContainer center={position} zoom={13} style={{ height: "600px" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {session?.user?.email ? (
          //re-render the map with the new data from the database
          users.map((user) => (
            <Circle center={[user.latitude, user.longitude]} radius={200}>
              <Marker position={[user.latitude, user.longitude]} icon={costumIcon}>
                <Popup>
                  <Image
                    src={user.image}
                    alt="user image"
                    width={130}
                    height={130}
                  />
                  <br />
                  {user.name}
                </Popup>
              </Marker>
            </Circle>
          ))
        ) : (
        //  <Exp1 />
        <Exp2 />
        )}
      </MapContainer>
    </div>
  );
};

export default LeafMap;
