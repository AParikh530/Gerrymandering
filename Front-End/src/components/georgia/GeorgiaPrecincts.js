import React from "react";
import "leaflet/dist/leaflet.css";
import { GeoJSON } from "react-leaflet";
import NV_precincts from "../../data/NV_precincts.json";

const GeorgiaPrecincts = ({
  key,
  data,
  asian,
  asianvap,
  black,
  bvap,
  hisp,
  hvap,
}) => {
  const precinctStyleDefault = {
    fillColor: "gray",
    fillOpacity: 0.2,
    color: "black",
    weight: 1,
  };

  const precinctStyleClicked = {
    fillColor: "lightblue",
    fillOpacity: 0.5,
    color: "black",
    weight: 2,
  };

  const onEachPrecinct = (precinct, layer) => {
    const displayMinorityPop =
      "Black: Pop-" +
      black +
      ", VAP-" +
      bvap +
      ", Hispanic: Pop-" +
      hisp +
      ", VAP-" +
      hvap +
      ", Asian: Pop-" +
      asian +
      ", VAP-" +
      asianvap;
    layer.on({
      mouseover: (e) => {
        layer.bindPopup(displayMinorityPop).openPopup();
        e.target.setStyle(precinctStyleClicked);
      },
      mouseout: (e) => {
        layer.bindPopup(displayMinorityPop).closePopup();
        e.target.setStyle(precinctStyleDefault);
      },
    });
  };

  return (
    <div>
      <GeoJSON
        key={key}
        style={precinctStyleDefault}
        data={data.geoJson.features}
        onEachFeature={onEachPrecinct}
      />
    </div>
  );
};

export default GeorgiaPrecincts;
