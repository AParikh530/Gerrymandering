import React, { useState, useEffect } from "react";
import "../../../node_modules/leaflet/dist/leaflet.css";
import { Button } from "react-materialize";
import { Slider } from "@material-ui/core";
import emitter from "../../libs/mitt";

const Measures = () => {
  const [compactValue, setCompactValue] = useState(0.5);
  const [geoDev, setGeoDev] = useState(0.5);
  const [popDev, setPopDev] = useState(0.5);
  const [avgDev, setAvgDev] = useState(0.5);

  const handleCompactChange = (e, newValue) => {
    setCompactValue(newValue);
  };

  const handleGeoDevChange = (e, newValue) => {
    setGeoDev(newValue);
  };

  const handlePopDevChange = (e, newValue) => {
    setPopDev(newValue);
  };

  const handleAvgDevChange = (e, newValue) => {
    setAvgDev(newValue);
  };

  const handleButtonClick = () => {
    emitter.emit("applyWeights", {
      weights: [compactValue, geoDev, popDev, avgDev],
    });
  };

  return (
    <div style={{ marginRight: "10px", marginLeft: "10px" }}>
      <h7>
        <strong>Compactness</strong>
      </h7>
      <Slider
        value={compactValue}
        min={0}
        step={0.01}
        max={1}
        onChange={handleCompactChange}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
      />
      <h7>
        <strong>Geometric Deviation From Enacted</strong>
      </h7>
      <Slider
        value={geoDev}
        min={0}
        step={0.01}
        max={1}
        onChange={handleGeoDevChange}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
      />
      <h7>
        <strong>Population Deviation From Enacted</strong>
      </h7>
      <Slider
        value={popDev}
        min={0}
        step={0.01}
        max={1}
        onChange={handlePopDevChange}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
      />
      <h7>
        <strong>Demographic Deviation From Average</strong>
      </h7>
      <Slider
        value={avgDev}
        min={0}
        step={0.01}
        max={1}
        onChange={handleAvgDevChange}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
      />
      <h7>Split Counties</h7>
      <Slider
        disabled
        value={0.5}
        min={0}
        step={0.01}
        max={1}
        onChange={handleAvgDevChange}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "8vh",
        }}
      >
        <Button onClick={handleButtonClick}>Run</Button>
      </div>
    </div>
  );
};

export default Measures;
