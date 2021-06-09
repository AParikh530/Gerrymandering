import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { GeoJSON } from "react-leaflet";
import NV_districts from "../../data/NV_districts.json";
import NevadaPrecincts from "./GeorgiaPrecincts";
import emitter from "../../libs/mitt";

const GeorgiaDistricts = ({
  key,
  data,
  districtingId,
  totalPop,
  blackPop,
  hispPop,
  asianPop,
  currId,
}) => {
  const districtStyleDefault = {
    fillColor: "red",
    fillOpacity: 0.2,
    color: "blue",
    weight: 3,
  };

  const districtStyleClicked = {
    fillColor: "red",
    fillOpacity: 0.5,
    color: "blue",
    weight: 4,
  };

  const onEachDistrict = (district, layer) => {
    if (districtingId != 1) {
      const newCur = currId + 1;
      const districtInfo =
        "Total Pop: " +
        totalPop +
        ", Black Pop: " +
        blackPop +
        ", Hispanic Pop: " +
        hispPop +
        ", Asian Pop: " +
        asianPop +
        ", Corresponding District: " +
        newCur;
      layer.on({
        mouseover: (e) => {
          layer.bindPopup(districtInfo).openPopup();
          e.target.setStyle(districtStyleClicked);
        },
        mouseout: (e) => {
          layer.bindPopup(districtInfo).closePopup();
          e.target.setStyle(districtStyleDefault);
        },
      });
    } else {
      layer.on({
        mouseover: (e) => {
          e.target.setStyle(districtStyleClicked);
        },
        mouseout: (e) => {
          e.target.setStyle(districtStyleDefault);
        },
      });
    }
  };

  return (
    <div>
      <GeoJSON
        key={key}
        style={districtStyleDefault}
        data={data.geoJson.features}
        onEachFeature={onEachDistrict}
      />
    </div>
  );
};

export default GeorgiaDistricts;
