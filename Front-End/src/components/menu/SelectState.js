import React from "react";
import "../../../node_modules/leaflet/dist/leaflet.css";
import {
  Checkbox,
  Collection,
  CollectionItem,
  Row,
  Col,
} from "react-materialize";
import NevadaOptions from "./NevadaOptions";
import emitter from "../../libs/mitt";

const SelectState = ({ nevadaChecked }) => {
  const NevadaClicked = () => {
    emitter.emit("nevadaChecked", { nevadaChecked: !nevadaChecked });
  };

  return (
    <div style={{ paddingLeft: "30px" }}>
      <Checkbox
        id="Checkbox_3"
        checked={nevadaChecked}
        label="Georgia"
        value="georgia"
        onChange={() => NevadaClicked()}
      />

      {nevadaChecked ? <NevadaOptions /> : !(<NevadaOptions />)}
      {nevadaChecked ? (
        <Collection header={<h5>Job 1</h5>}>
          <CollectionItem>
            Districtings Generated: <strong>5000</strong>
          </CollectionItem>
          <CollectionItem>
            Parameters: <strong>From 416 Website</strong>
          </CollectionItem>
        </Collection>
      ) : null}
    </div>
  );
};

export default SelectState;
