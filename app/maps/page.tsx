import React from "react";
import dynamic from "next/dynamic";

const ExpMap = dynamic(() => import("../../components/ui/ExpMap"), {
  ssr: false,
});
const Maps = () => {
  return (
    <div style={{ paddingTop: "70px" }}>
      <ExpMap />
    </div>
  );
};

export default Maps;
