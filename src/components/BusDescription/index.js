import React from "react";

const BusDescription = ({ Destination, RouteNo }) => {
  return (
    <p>
      {RouteNo} {Destination}
    </p>
  );
};

export default BusDescription;
