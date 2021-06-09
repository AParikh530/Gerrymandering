import React, { useState } from "react";
import "../../../node_modules/leaflet/dist/leaflet.css";
import {
  Collapsible,
  CollapsibleItem,
  SideNav,
  SideNavItem,
  Button,
  Icon,
  Checkbox,
} from "react-materialize";
import emitter from "../../libs/mitt";

const NevadaOptions = () => {
  const [displayDistricts, setDisplayDistricts] = useState(true);
  const [displayPrecincts, setDisplayPrecincts] = useState(false);

  const handleDistricts = () => {
    setDisplayDistricts((prev) => {
      emitter.emit("nevadaDistrictsChecked", { displayDistricts: !prev });
      return !prev;
    });
  };

  const handlePrecincts = () => {
    setDisplayPrecincts((prev) => {
      emitter.emit("nevadaPrecinctsChecked", { displayPrecincts: !prev });
      return !prev;
    });
  };

  return (
    <div style={{ paddingLeft: "30px" }}>
      <Checkbox
        id="Checkbox_4"
        checked={displayDistricts}
        label="Show Districts"
        value="showDistricts"
        onChange={() => handleDistricts()}
      />
      <Checkbox
        id="Checkbox_5"
        checked={displayPrecincts}
        label="Show Precincts"
        value="showPrecincts"
        onChange={() => handlePrecincts()}
      />
    </div>
  );
};

export default NevadaOptions;
