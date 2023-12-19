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

import "leaflet/dist/leaflet.css";
import { Icon, LatLngExpression } from "leaflet";
import { useSession } from "next-auth/react";
import Image from "next/image";
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
  const [position, setPosition] = React.useState<LatLngExpression>([
    16.654543, 73.761443,
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

  const costumIcon = new Icon({
    iconUrl: "/marker.png",
    iconSize: [25, 25],
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
    <div>
      <MapContainer center={position} zoom={13} style={{ height: "600px" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {session?.user?.email ? (
          //re-render the map with the new data from the database
          users.map((user) => (
            <Marker
              position={[user.latitude, user.longitude]}
              icon={costumIcon}
              key={user.userId}
            >
              <Popup>
                <Image
                  src={user.image || Truck}
                  alt="user image"
                  width={130}
                  height={130}
                />
                <br />
                {user.name || "Anonomous Driver"}{" "}
              </Popup>
            </Marker>
          ))
        ) : (
          <Marker position={position} icon={costumIcon}>
            <Popup>
              <Image
                src={session?.user?.image || Truck}
                alt="user image"
                width={130}
                height={130}
              />
              <br />
              {session?.user?.name || "Anonomous Driver"}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default LeafMap;
