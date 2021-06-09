import React, { useState, useEffect } from "react";
import "../../../node_modules/leaflet/dist/leaflet.css";
import { RangeStepInput } from "react-range-step-input";
import {
  Select,
  Modal,
  Button,
  Checkbox,
  Table,
  Collection,
  CollectionItem,
} from "react-materialize";
import emitter from "../../libs/mitt";

const Results = () => {
  const [sortingType, setSortingType] = useState();
  const [topOFs, setTopOFs] = useState([]);
  const [topOFIds, setTopOFIds] = useState([]);
  const [topCompactnesses, setTopCompactnesses] = useState([]);
  const [topCompactnessesIds, setTopCompactnessesIds] = useState([]);
  const [topGeoDevs, setTopGeoDevs] = useState([]);
  const [topGeoDevsIds, setTopGeoDevsIds] = useState([]);
  const [topPopDevs, setTopPopDevs] = useState([]);
  const [topPopDevsIds, setTopPopDevsIds] = useState([]);
  const [topAvgDevs, setTopAvgDevs] = useState([]);
  const [topAvgDevsIds, setTopAvgDevsIds] = useState([]);
  const [displayTopOFS, setDisplayTopOFS] = useState(false);
  const [displayTopCompactnesses, setDisplayTopCompactnessees] = useState(
    false
  );
  const [displayTopGeoDevs, setDisplayTopGeoDevs] = useState(false);
  const [displayTopPopDevs, setDisplayTopPopDevs] = useState(false);
  const [displayTopAvgDevs, setDisplayTopAvgDevs] = useState(false);
  const [currDistrictingId, setCurrDistrictingId] = useState(0);
  const [currOFS, setCurrOFS] = useState(0);
  const [currCompactness, setCurrCompactness] = useState(0);
  const [currGeoDev, setCurrGeoDev] = useState(0);
  const [currPopDev, setCurrPopDev] = useState(0);
  const [currAvgDev, setCurrAvgDev] = useState(0);
  const [district1Data, setDistrict1Data] = useState([]);
  const [district2Data, setDistrict2Data] = useState([]);
  const [district3Data, setDistrict3Data] = useState([]);
  const [district4Data, setDistrict4Data] = useState([]);
  const [district5Data, setDistrict5Data] = useState([]);
  const [district6Data, setDistrict6Data] = useState([]);
  const [district7Data, setDistrict7Data] = useState([]);
  const [district8Data, setDistrict8Data] = useState([]);
  const [district9Data, setDistrict9Data] = useState([]);
  const [district10Data, setDistrict10Data] = useState([]);
  const [district11Data, setDistrict11Data] = useState([]);
  const [district12Data, setDistrict12Data] = useState([]);
  const [district13Data, setDistrict13Data] = useState([]);
  const [district14Data, setDistrict14Data] = useState([]);

  const handleSortingTypeChange = (e) => {
    setSortingType(e.target.value);
  };

  const handleDistrictingClick = (districtingId) => {
    setCurrDistrictingId(districtingId);
    let counter = 0;
    topOFIds.forEach((id) => {
      if (id == districtingId) setCurrOFS(topOFs[counter]);
      counter += 1;
    });
    counter = 0;
    topCompactnessesIds.forEach((id) => {
      if (id == districtingId) setCurrCompactness(topCompactnesses[counter]);
      counter += 1;
    });
    counter = 0;
    topGeoDevsIds.forEach((id) => {
      if (id == districtingId) setCurrGeoDev(topGeoDevs[counter]);
      counter += 1;
    });
    counter = 0;
    topPopDevsIds.forEach((id) => {
      if (id == districtingId) setCurrPopDev(topPopDevs[counter]);
      counter += 1;
    });
    counter = 0;
    topAvgDevsIds.forEach((id) => {
      if (id == districtingId) setCurrAvgDev(topAvgDevs[counter]);
      counter += 1;
    });
  };

  const handleShowCurrentDistricting = () => {
    emitter.emit("showCurrentDistricting", { id: currDistrictingId });
  };

  const handleShowEnactedDistricting = () => {
    emitter.emit("showEnactedDistricting", { id: 1 });
  };

  useEffect(() => {
    if (sortingType == "ofs") {
      setDisplayTopOFS(true);
      setDisplayTopCompactnessees(false);
      setDisplayTopGeoDevs(false);
      setDisplayTopPopDevs(false);
      setDisplayTopAvgDevs(false);
    } else if (sortingType == "compactness") {
      setDisplayTopOFS(false);
      setDisplayTopCompactnessees(true);
      setDisplayTopGeoDevs(false);
      setDisplayTopPopDevs(false);
      setDisplayTopAvgDevs(false);
    } else if (sortingType == "geoDev") {
      setDisplayTopOFS(false);
      setDisplayTopCompactnessees(false);
      setDisplayTopGeoDevs(true);
      setDisplayTopPopDevs(false);
      setDisplayTopAvgDevs(false);
    } else if (sortingType == "popDev") {
      setDisplayTopOFS(false);
      setDisplayTopCompactnessees(false);
      setDisplayTopGeoDevs(false);
      setDisplayTopPopDevs(true);
      setDisplayTopAvgDevs(false);
    } else if (sortingType == "avgDev") {
      setDisplayTopOFS(false);
      setDisplayTopCompactnessees(false);
      setDisplayTopGeoDevs(false);
      setDisplayTopPopDevs(false);
      setDisplayTopAvgDevs(true);
    }
  }, [sortingType]);

  useEffect(() => {
    emitter.on("sortingInfo", (payload) => {
      console.log(payload);
      payload = payload.sortingInfo;
      setTopOFs((prev) => payload.topOFs || prev || []);
      setTopOFIds((prev) => payload.topOFIds || prev || []);
      setTopCompactnesses((prev) => payload.topCompactnesses || prev || []);
      setTopCompactnessesIds(
        (prev) => payload.topCompactnessesIds || prev || []
      );
      setTopGeoDevs((prev) => payload.topGeoDevs || prev || []);
      setTopGeoDevsIds((prev) => payload.topGeoDevsIds || prev || []);
      setTopPopDevs((prev) => payload.topPopDevs || prev || []);
      setTopPopDevsIds((prev) => payload.topPopDevsIds || prev || []);
      setTopAvgDevs((prev) => payload.topAvgDevs || prev || []);
      setTopAvgDevsIds((prev) => payload.topAvgDevsIds || prev || []);
    });
  }, []);

  useEffect(() => {
    emitter.on("districtsData", (payload) => {
      const data = payload.data;
      setDistrict1Data((prev) => data[0] || prev || []);
      setDistrict2Data((prev) => data[1] || prev || []);
      setDistrict3Data((prev) => data[2] || prev || []);
      setDistrict4Data((prev) => data[3] || prev || []);
      setDistrict5Data((prev) => data[4] || prev || []);
      setDistrict6Data((prev) => data[5] || prev || []);
      setDistrict7Data((prev) => data[6] || prev || []);
      setDistrict8Data((prev) => data[7] || prev || []);
      setDistrict9Data((prev) => data[8] || prev || []);
      setDistrict10Data((prev) => data[9] || prev || []);
      setDistrict11Data((prev) => data[10] || prev || []);
      setDistrict12Data((prev) => data[11] || prev || []);
      setDistrict13Data((prev) => data[12] || prev || []);
      setDistrict14Data((prev) => data[13] || prev || []);
    });
  }, []);

  return (
    <div style={{ marginRight: "10px", marginLeft: "10px" }}>
      <strong>Districtings Sorted By: </strong>
      <Select
        id="Select-1"
        multiple={false}
        options={{
          classes: "",
          dropdownOptions: {
            alignment: "left",
            autoTrigger: true,
            closeOnClick: true,
            constrainWidth: true,
            coverTrigger: true,
            hover: false,
            inDuration: 150,
            onCloseEnd: null,
            onCloseStart: null,
            onOpenEnd: null,
            onOpenStart: null,
            outDuration: 250,
          },
        }}
        value=""
        onChange={handleSortingTypeChange}
      >
        <option disabled value="">
          Select
        </option>
        <option value="ofs">Objective Function Score</option>
        <option value="compactness">Compactness</option>
        <option value="geoDev">Geometric Deviation From Enacted</option>
        <option value="popDev">Population Deviation From Enacted</option>
        <option value="avgDev">Demographic Deviation From Average</option>
      </Select>
      <div style={displayTopOFS ? null : { display: "none" }}>
        <Collection>
          <CollectionItem>
            <Checkbox
              id="Checkbox_20"
              label={
                topOFs.length !== 0 && topOFIds.length !== 0
                  ? "Districting " + topOFIds[0] + ": " + topOFs[0]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topOFIds[0])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_21"
              label={
                topOFs.length > 1 && topOFIds.length > 1
                  ? "Districting " + topOFIds[1] + ": " + topOFs[1]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topOFIds[1])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_22"
              label={
                topOFs.length > 2 && topOFIds.length > 2
                  ? "Districting " + topOFIds[2] + ": " + topOFs[2]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topOFIds[2])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_23"
              label={
                topOFs.length > 3 && topOFIds.length > 3
                  ? "Districting " + topOFIds[3] + ": " + topOFs[3]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topOFIds[3])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_24"
              label={
                topOFs.length > 4 && topOFIds.length > 4
                  ? "Districting " + topOFIds[4] + ": " + topOFs[4]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topOFIds[4])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_25"
              label={
                topOFs.length > 5 && topOFIds.length > 5
                  ? "Districting " + topOFIds[5] + ": " + topOFs[5]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topOFIds[5])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_26"
              label={
                topOFs.length > 6 && topOFIds.length > 6
                  ? "Districting " + topOFIds[6] + ": " + topOFs[6]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topOFIds[6])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_27"
              label={
                topOFs.length > 7 && topOFIds.length > 7
                  ? "Districting " + topOFIds[7] + ": " + topOFs[7]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topOFIds[7])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_28"
              label={
                topOFs.length > 8 && topOFIds.length > 8
                  ? "Districting " + topOFIds[8] + ": " + topOFs[8]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topOFIds[8])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_29"
              label={
                topOFs.length > 9 && topOFIds.length > 9
                  ? "Districting " + topOFIds[9] + ": " + topOFs[9]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topOFIds[9])}
            />
          </CollectionItem>
        </Collection>
      </div>

      <div style={displayTopCompactnesses ? null : { display: "none" }}>
        <Collection>
          <CollectionItem>
            <Checkbox
              id="Checkbox_30"
              label={
                topCompactnesses.length !== 0 &&
                topCompactnessesIds.length !== 0
                  ? "Districting " +
                    topCompactnessesIds[0] +
                    ": " +
                    topCompactnesses[0]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topCompactnessesIds[0])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_31"
              label={
                topCompactnesses.length > 1 && topCompactnessesIds.length > 1
                  ? "Districting " +
                    topCompactnessesIds[1] +
                    ": " +
                    topCompactnesses[1]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topCompactnessesIds[1])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_32"
              label={
                topCompactnesses.length > 2 && topCompactnessesIds.length > 2
                  ? "Districting " +
                    topCompactnessesIds[2] +
                    ": " +
                    topCompactnesses[2]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topCompactnessesIds[2])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_33"
              label={
                topCompactnesses.length > 3 && topCompactnessesIds.length > 3
                  ? "Districting " +
                    topCompactnessesIds[3] +
                    ": " +
                    topCompactnesses[3]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topCompactnessesIds[3])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_34"
              label={
                topCompactnesses.length > 4 && topCompactnessesIds.length > 4
                  ? "Districting " +
                    topCompactnessesIds[4] +
                    ": " +
                    topCompactnesses[4]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topCompactnessesIds[4])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_35"
              label={
                topCompactnesses.length > 5 && topCompactnessesIds.length > 5
                  ? "Districting " +
                    topCompactnessesIds[5] +
                    ": " +
                    topCompactnesses[5]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topCompactnessesIds[5])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_36"
              label={
                topCompactnesses.length > 6 && topCompactnessesIds.length > 6
                  ? "Districting " +
                    topCompactnessesIds[6] +
                    ": " +
                    topCompactnesses[6]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topCompactnessesIds[6])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_37"
              label={
                topCompactnesses.length > 7 && topCompactnessesIds.length > 7
                  ? "Districting " +
                    topCompactnessesIds[7] +
                    ": " +
                    topCompactnesses[7]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topCompactnessesIds[7])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_38"
              label={
                topCompactnesses.length > 8 && topCompactnessesIds.length > 8
                  ? "Districting " +
                    topCompactnessesIds[8] +
                    ": " +
                    topCompactnesses[8]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topCompactnessesIds[8])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_39"
              label={
                topCompactnesses.length > 9 && topCompactnessesIds.length > 9
                  ? "Districting " +
                    topCompactnessesIds[9] +
                    ": " +
                    topCompactnesses[9]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topCompactnessesIds[9])}
            />
          </CollectionItem>
        </Collection>
      </div>

      <div style={displayTopGeoDevs ? null : { display: "none" }}>
        <Collection>
          <CollectionItem>
            <Checkbox
              id="Checkbox_40"
              label={
                topGeoDevs.length !== 0 && topGeoDevsIds.length !== 0
                  ? "Districting " + topGeoDevsIds[0] + ": " + topGeoDevs[0]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topGeoDevsIds[0])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_41"
              label={
                topGeoDevs.length > 1 && topGeoDevsIds.length > 1
                  ? "Districting " + topGeoDevsIds[1] + ": " + topGeoDevs[1]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topGeoDevsIds[1])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_42"
              label={
                topGeoDevs.length > 2 && topGeoDevsIds.length > 2
                  ? "Districting " + topGeoDevsIds[2] + ": " + topGeoDevs[2]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topGeoDevsIds[2])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_43"
              label={
                topGeoDevs.length > 3 && topGeoDevsIds.length > 3
                  ? "Districting " + topGeoDevsIds[3] + ": " + topGeoDevs[3]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topGeoDevsIds[3])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_44"
              label={
                topGeoDevs.length > 4 && topGeoDevsIds.length > 4
                  ? "Districting " + topGeoDevsIds[4] + ": " + topGeoDevs[4]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topGeoDevsIds[4])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_45"
              label={
                topGeoDevs.length > 5 && topGeoDevsIds.length > 5
                  ? "Districting " + topGeoDevsIds[5] + ": " + topGeoDevs[5]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topGeoDevsIds[5])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_46"
              label={
                topGeoDevs.length > 6 && topGeoDevsIds.length > 6
                  ? "Districting " + topGeoDevsIds[6] + ": " + topGeoDevs[6]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topGeoDevsIds[6])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_47"
              label={
                topGeoDevs.length > 7 && topGeoDevsIds.length > 7
                  ? "Districting " + topGeoDevsIds[7] + ": " + topGeoDevs[7]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topGeoDevsIds[7])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_48"
              label={
                topGeoDevs.length > 8 && topGeoDevsIds.length > 8
                  ? "Districting " + topGeoDevsIds[8] + ": " + topGeoDevs[8]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topGeoDevsIds[8])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_49"
              label={
                topGeoDevs.length > 9 && topGeoDevsIds.length > 9
                  ? "Districting " + topGeoDevsIds[9] + ": " + topGeoDevs[9]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topGeoDevsIds[9])}
            />
          </CollectionItem>
        </Collection>
      </div>

      <div style={displayTopPopDevs ? null : { display: "none" }}>
        <Collection>
          <CollectionItem>
            <Checkbox
              id="Checkbox_50"
              label={
                topPopDevs.length !== 0 && topPopDevsIds.length !== 0
                  ? "Districting " + topPopDevsIds[0] + ": " + topPopDevs[0]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topPopDevsIds[0])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_51"
              label={
                topPopDevs.length > 1 && topPopDevsIds.length > 1
                  ? "Districting " + topPopDevsIds[1] + ": " + topPopDevs[1]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topPopDevsIds[1])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_52"
              label={
                topPopDevs.length > 2 && topPopDevsIds.length > 2
                  ? "Districting " + topPopDevsIds[2] + ": " + topPopDevs[2]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topPopDevsIds[2])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_53"
              label={
                topPopDevs.length > 3 && topPopDevsIds.length > 3
                  ? "Districting " + topPopDevsIds[3] + ": " + topPopDevs[3]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topPopDevsIds[3])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_54"
              label={
                topPopDevs.length > 4 && topPopDevsIds.length > 4
                  ? "Districting " + topPopDevsIds[4] + ": " + topPopDevs[4]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topPopDevsIds[4])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_55"
              label={
                topPopDevs.length > 5 && topPopDevsIds.length > 5
                  ? "Districting " + topPopDevsIds[5] + ": " + topPopDevs[5]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topPopDevsIds[5])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_56"
              label={
                topPopDevs.length > 6 && topPopDevsIds.length > 6
                  ? "Districting " + topPopDevsIds[6] + ": " + topPopDevs[6]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topPopDevsIds[6])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_57"
              label={
                topPopDevs.length > 7 && topPopDevsIds.length > 7
                  ? "Districting " + topPopDevsIds[7] + ": " + topPopDevs[7]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topPopDevsIds[7])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_58"
              label={
                topPopDevs.length > 8 && topPopDevsIds.length > 8
                  ? "Districting " + topPopDevsIds[8] + ": " + topPopDevs[8]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topPopDevsIds[8])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_59"
              label={
                topPopDevs.length > 9 && topPopDevsIds.length > 9
                  ? "Districting " + topPopDevsIds[9] + ": " + topPopDevs[9]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topPopDevsIds[9])}
            />
          </CollectionItem>
        </Collection>
      </div>

      <div style={displayTopAvgDevs ? null : { display: "none" }}>
        <Collection>
          <CollectionItem>
            <Checkbox
              id="Checkbox_60"
              label={
                topAvgDevs.length !== 0 && topAvgDevsIds.length !== 0
                  ? "Districting " + topAvgDevsIds[0] + ": " + topAvgDevs[0]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topAvgDevsIds[0])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_61"
              label={
                topAvgDevs.length > 1 && topAvgDevsIds.length > 1
                  ? "Districting " + topAvgDevsIds[1] + ": " + topAvgDevs[1]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topAvgDevsIds[1])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_62"
              label={
                topAvgDevs.length > 2 && topAvgDevsIds.length > 2
                  ? "Districting " + topAvgDevsIds[2] + ": " + topAvgDevs[2]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topAvgDevsIds[2])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_63"
              label={
                topAvgDevs.length > 3 && topAvgDevsIds.length > 3
                  ? "Districting " + topAvgDevsIds[3] + ": " + topAvgDevs[3]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topAvgDevsIds[3])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_64"
              label={
                topAvgDevs.length > 4 && topAvgDevsIds.length > 4
                  ? "Districting " + topAvgDevsIds[4] + ": " + topAvgDevs[4]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topAvgDevsIds[4])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_65"
              label={
                topAvgDevs.length > 5 && topAvgDevsIds.length > 5
                  ? "Districting " + topAvgDevsIds[5] + ": " + topAvgDevs[5]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topAvgDevsIds[5])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_66"
              label={
                topAvgDevs.length > 6 && topAvgDevsIds.length > 6
                  ? "Districting " + topAvgDevsIds[6] + ": " + topAvgDevs[6]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topAvgDevsIds[6])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_67"
              label={
                topAvgDevs.length > 7 && topAvgDevsIds.length > 7
                  ? "Districting " + topAvgDevsIds[7] + ": " + topAvgDevs[7]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topAvgDevsIds[7])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_68"
              label={
                topAvgDevs.length > 8 && topAvgDevsIds.length > 8
                  ? "Districting " + topAvgDevsIds[8] + ": " + topAvgDevs[8]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topAvgDevsIds[8])}
            />
          </CollectionItem>
          <CollectionItem>
            <Checkbox
              id="Checkbox_69"
              label={
                topAvgDevs.length > 9 && topAvgDevsIds.length > 9
                  ? "Districting " + topAvgDevsIds[9] + ": " + topAvgDevs[9]
                  : null
              }
              value="alvin"
              onChange={() => handleDistrictingClick(topAvgDevsIds[9])}
            />
          </CollectionItem>
        </Collection>
      </div>
      <Modal
        actions={[
          <Button flat modal="close" node="button" waves="green">
            Close
          </Button>,
        ]}
        bottomSheet={false}
        fixedFooter={false}
        header="Districting Comparison"
        id="Modal-0"
        open={false}
        options={{
          dismissible: true,
          endingTop: "10%",
          inDuration: 250,
          onCloseEnd: null,
          onCloseStart: null,
          onOpenEnd: null,
          onOpenStart: null,
          opacity: 0.5,
          outDuration: 250,
          preventScrolling: true,
          startingTop: "4%",
        }}
        trigger={<Button node="button">Compare To Enacted</Button>}
      >
        <Table>
          <thead>
            <tr>
              <th>Current</th>
              <th>Enacted</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <strong>OF Score:</strong> {currOFS.toFixed(5)}
              </td>
              <td>
                <strong>OF Score:</strong> 0.61941
              </td>
            </tr>
            <tr>
              <td>
                <strong>Compactness:</strong> {currCompactness.toFixed(5)}
              </td>
              <td>
                <strong>Compactness:</strong> 0.23882
              </td>
            </tr>
            <tr>
              <td>
                <strong>Geometric Deviation:</strong> {currGeoDev.toFixed(5)}
              </td>
              <td>
                <strong>Geometric Deviation:</strong> 0
              </td>
            </tr>
            <tr>
              <td>
                <strong>Population Deviation:</strong> {currPopDev.toFixed(5)}
              </td>
              <td>
                <strong>Population Deviation:</strong> 0
              </td>
            </tr>
            <tr>
              <td>
                <Button onClick={handleShowCurrentDistricting}>
                  Show Districting on Map
                </Button>
              </td>
              <td>
                <Button onClick={handleShowEnactedDistricting}>
                  Show Enacted on Map
                </Button>
              </td>
            </tr>
            <tr>
              <td>
                <Modal
                  actions={[
                    <Button flat modal="close" node="button" waves="green">
                      Close
                    </Button>,
                  ]}
                  bottomSheet={false}
                  fixedFooter={false}
                  header="District Details"
                  id="Modal-0"
                  open={false}
                  options={{
                    dismissible: true,
                    endingTop: "10%",
                    inDuration: 250,
                    onCloseEnd: null,
                    onCloseStart: null,
                    onOpenEnd: null,
                    onOpenStart: null,
                    opacity: 0.5,
                    outDuration: 250,
                    preventScrolling: true,
                    startingTop: "4%",
                  }}
                  trigger={<Button node="button">District Detail</Button>}
                >
                  <Table>
                    <thead>
                      <tr>
                        <th>District ID</th>
                        <th>Total Population</th>
                        <th>Black Population</th>
                        <th>Asian Population</th>
                        <th>Hispanic Population</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          {district1Data.length !== 0
                            ? district1Data.corr_ids + 1
                            : null}
                        </td>
                        <td>
                          {district1Data.length !== 0
                            ? Intl.NumberFormat().format(district1Data.totalPop)
                            : null}
                        </td>
                        <td>
                          {district1Data.length !== 0
                            ? Intl.NumberFormat().format(
                                Math.floor(district1Data.blackPop / 3)
                              )
                            : null}
                        </td>
                        <td>
                          {district1Data.length !== 0
                            ? Intl.NumberFormat().format(district1Data.asianPop)
                            : null}
                        </td>
                        <td>
                          {district1Data.length !== 0
                            ? Intl.NumberFormat().format(district1Data.hispPop)
                            : null}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {district2Data.length !== 0
                            ? district2Data.corr_ids + 1
                            : null}
                        </td>
                        <td>
                          {district2Data.length !== 0
                            ? Intl.NumberFormat().format(district2Data.totalPop)
                            : null}
                        </td>
                        <td>
                          {district2Data.length !== 0
                            ? Intl.NumberFormat().format(
                                Math.floor(district2Data.blackPop / 3)
                              )
                            : null}
                        </td>
                        <td>
                          {district2Data.length !== 0
                            ? Intl.NumberFormat().format(district2Data.asianPop)
                            : null}
                        </td>
                        <td>
                          {district2Data.length !== 0
                            ? Intl.NumberFormat().format(district2Data.hispPop)
                            : null}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {district3Data.length !== 0
                            ? district3Data.corr_ids + 1
                            : null}
                        </td>
                        <td>
                          {district3Data.length !== 0
                            ? Intl.NumberFormat().format(district3Data.totalPop)
                            : null}
                        </td>
                        <td>
                          {district3Data.length !== 0
                            ? Intl.NumberFormat().format(
                                Math.floor(district3Data.blackPop / 3)
                              )
                            : null}
                        </td>
                        <td>
                          {district3Data.length !== 0
                            ? Intl.NumberFormat().format(district3Data.asianPop)
                            : null}
                        </td>
                        <td>
                          {district3Data.length !== 0
                            ? Intl.NumberFormat().format(district3Data.hispPop)
                            : null}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {district4Data.length !== 0
                            ? district4Data.corr_ids + 1
                            : null}
                        </td>
                        <td>
                          {district4Data.length !== 0
                            ? Intl.NumberFormat().format(district4Data.totalPop)
                            : null}
                        </td>
                        <td>
                          {district4Data.length !== 0
                            ? Intl.NumberFormat().format(
                                Math.floor(district4Data.blackPop / 3)
                              )
                            : null}
                        </td>
                        <td>
                          {district4Data.length !== 0
                            ? Intl.NumberFormat().format(district4Data.asianPop)
                            : null}
                        </td>
                        <td>
                          {district4Data.length !== 0
                            ? Intl.NumberFormat().format(district4Data.hispPop)
                            : null}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {district5Data.length !== 0
                            ? district5Data.corr_ids + 1
                            : null}
                        </td>
                        <td>
                          {district5Data.length !== 0
                            ? Intl.NumberFormat().format(district5Data.totalPop)
                            : null}
                        </td>
                        <td>
                          {district5Data.length !== 0
                            ? Intl.NumberFormat().format(
                                Math.floor(district5Data.blackPop / 3)
                              )
                            : null}
                        </td>
                        <td>
                          {district5Data.length !== 0
                            ? Intl.NumberFormat().format(district5Data.asianPop)
                            : null}
                        </td>
                        <td>
                          {district5Data.length !== 0
                            ? Intl.NumberFormat().format(district5Data.hispPop)
                            : null}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {district6Data.length !== 0
                            ? district6Data.corr_ids + 1
                            : null}
                        </td>
                        <td>
                          {district6Data.length !== 0
                            ? Intl.NumberFormat().format(district6Data.totalPop)
                            : null}
                        </td>
                        <td>
                          {district6Data.length !== 0
                            ? Intl.NumberFormat().format(
                                Math.floor(district6Data.blackPop / 3)
                              )
                            : null}
                        </td>
                        <td>
                          {district6Data.length !== 0
                            ? Intl.NumberFormat().format(district6Data.asianPop)
                            : null}
                        </td>
                        <td>
                          {district6Data.length !== 0
                            ? Intl.NumberFormat().format(district6Data.hispPop)
                            : null}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {district7Data.length !== 0
                            ? district7Data.corr_ids + 1
                            : null}
                        </td>
                        <td>
                          {district7Data.length !== 0
                            ? Intl.NumberFormat().format(district7Data.totalPop)
                            : null}
                        </td>
                        <td>
                          {district7Data.length !== 0
                            ? Intl.NumberFormat().format(
                                Math.floor(district7Data.blackPop / 3)
                              )
                            : null}
                        </td>
                        <td>
                          {district7Data.length !== 0
                            ? Intl.NumberFormat().format(district7Data.asianPop)
                            : null}
                        </td>
                        <td>
                          {district7Data.length !== 0
                            ? Intl.NumberFormat().format(district7Data.hispPop)
                            : null}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {district8Data.length !== 0
                            ? district8Data.corr_ids + 1
                            : null}
                        </td>
                        <td>
                          {district8Data.length !== 0
                            ? Intl.NumberFormat().format(district8Data.totalPop)
                            : null}
                        </td>
                        <td>
                          {district8Data.length !== 0
                            ? Intl.NumberFormat().format(
                                Math.floor(district8Data.blackPop / 3)
                              )
                            : null}
                        </td>
                        <td>
                          {district8Data.length !== 0
                            ? Intl.NumberFormat().format(district8Data.asianPop)
                            : null}
                        </td>
                        <td>
                          {district8Data.length !== 0
                            ? Intl.NumberFormat().format(district8Data.hispPop)
                            : null}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {district9Data.length !== 0
                            ? district9Data.corr_ids + 1
                            : null}
                        </td>
                        <td>
                          {district9Data.length !== 0
                            ? Intl.NumberFormat().format(district9Data.totalPop)
                            : null}
                        </td>
                        <td>
                          {district9Data.length !== 0
                            ? Intl.NumberFormat().format(
                                Math.floor(district9Data.blackPop / 3)
                              )
                            : null}
                        </td>
                        <td>
                          {district9Data.length !== 0
                            ? Intl.NumberFormat().format(district9Data.asianPop)
                            : null}
                        </td>
                        <td>
                          {district9Data.length !== 0
                            ? Intl.NumberFormat().format(district9Data.hispPop)
                            : null}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {district10Data.length !== 0
                            ? district10Data.corr_ids + 1
                            : null}
                        </td>
                        <td>
                          {district10Data.length !== 0
                            ? Intl.NumberFormat().format(
                                district10Data.totalPop
                              )
                            : null}
                        </td>
                        <td>
                          {district10Data.length !== 0
                            ? Intl.NumberFormat().format(
                                Math.floor(district10Data.blackPop / 3)
                              )
                            : null}
                        </td>
                        <td>
                          {district10Data.length !== 0
                            ? Intl.NumberFormat().format(
                                district10Data.asianPop
                              )
                            : null}
                        </td>
                        <td>
                          {district10Data.length !== 0
                            ? Intl.NumberFormat().format(district10Data.hispPop)
                            : null}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {district11Data.length !== 0
                            ? district11Data.corr_ids + 1
                            : null}
                        </td>
                        <td>
                          {district11Data.length !== 0
                            ? Intl.NumberFormat().format(
                                district11Data.totalPop
                              )
                            : null}
                        </td>
                        <td>
                          {district11Data.length !== 0
                            ? Intl.NumberFormat().format(
                                Math.floor(district11Data.blackPop / 3)
                              )
                            : null}
                        </td>
                        <td>
                          {district11Data.length !== 0
                            ? Intl.NumberFormat().format(
                                district11Data.asianPop
                              )
                            : null}
                        </td>
                        <td>
                          {district11Data.length !== 0
                            ? Intl.NumberFormat().format(district11Data.hispPop)
                            : null}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {district12Data.length !== 0
                            ? district12Data.corr_ids + 1
                            : null}
                        </td>
                        <td>
                          {district12Data.length !== 0
                            ? Intl.NumberFormat().format(
                                district12Data.totalPop
                              )
                            : null}
                        </td>
                        <td>
                          {district12Data.length !== 0
                            ? Intl.NumberFormat().format(
                                Math.floor(district12Data.blackPop / 3)
                              )
                            : null}
                        </td>
                        <td>
                          {district12Data.length !== 0
                            ? Intl.NumberFormat().format(
                                district12Data.asianPop
                              )
                            : null}
                        </td>
                        <td>
                          {district12Data.length !== 0
                            ? Intl.NumberFormat().format(district12Data.hispPop)
                            : null}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {district13Data.length !== 0
                            ? district13Data.corr_ids + 1
                            : null}
                        </td>
                        <td>
                          {district13Data.length !== 0
                            ? Intl.NumberFormat().format(
                                district13Data.totalPop
                              )
                            : null}
                        </td>
                        <td>
                          {district13Data.length !== 0
                            ? Intl.NumberFormat().format(
                                Math.floor(district13Data.blackPop / 3)
                              )
                            : null}
                        </td>
                        <td>
                          {district13Data.length !== 0
                            ? Intl.NumberFormat().format(
                                district13Data.asianPop
                              )
                            : null}
                        </td>
                        <td>
                          {district13Data.length !== 0
                            ? Intl.NumberFormat().format(district13Data.hispPop)
                            : null}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          {district14Data.length !== 0
                            ? district14Data.corr_ids + 1
                            : null}
                        </td>
                        <td>
                          {district14Data.length !== 0
                            ? Intl.NumberFormat().format(
                                district14Data.totalPop
                              )
                            : null}
                        </td>
                        <td>
                          {district14Data.length !== 0
                            ? Intl.NumberFormat().format(
                                Math.floor(district14Data.blackPop / 3)
                              )
                            : null}
                        </td>
                        <td>
                          {district14Data.length !== 0
                            ? Intl.NumberFormat().format(
                                district14Data.asianPop
                              )
                            : null}
                        </td>
                        <td>
                          {district14Data.length !== 0
                            ? Intl.NumberFormat().format(district14Data.hispPop)
                            : null}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Modal>
              </td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </Modal>
    </div>
  );
};

export default Results;
