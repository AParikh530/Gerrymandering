import React, { useState, useEffect } from "react";
import { MapContainer, GeoJSON, TileLayer } from "react-leaflet";
import "../../node_modules/leaflet/dist/leaflet.css";
import "./MyMap.css";
import USMap from "../data/US.json";
import ChangeCenterToGeorgia from "./view/ChangeCenterToGeorgia";
import ChangeCenterToUSA from "./view/ChangeCenterToUSA";
import GeorgiaDistricts from "./georgia/GeorgiaDistricts";
import GeorgiaPrecincts from "./georgia/GeorgiaPrecincts";
import UserSideNav from "./menu/UserSideNav";
import { latLngBounds, Control, control } from "leaflet";
import emitter from "../libs/mitt";
import axios from "axios";
import hash from "object-hash";

const MyMap = () => {
  const US_CENTER = [38.5, -97];
  const SOUTH_WEST = [25, -135];
  const NORTH_EAST = [47, -55];
  const [mapCenter, setMapCenter] = useState(US_CENTER);
  const [showGeorgia, setShowGeorgia] = useState(false);
  const [showGeorgiaDistricts, setShowGeorgiaDistricts] = useState(false);
  const [showGeorgiaPrecincts, setShowGeorgiaPrecincts] = useState(false);
  const [USBoundaries, setUSBoundaries] = useState(null);
  // const [districtBounds, setDistrictBounds] = useState([]);
  const [districtsData, setDistrictsData] = useState([]);
  const [precinctData, setPrecinctData] = useState([]);
  const [districtingId, setDistrictingId] = useState(1);
  const [constrainedIds, setConstrainedIds] = useState([]);
  const [constrainedInfo, setConstrainedInfo] = useState([]);
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
  const [districtingsChanged, setDistrictingsChanged] = useState(0);

  const fetchCountry = async () => {
    const res = await axios.get("http://localhost:8080/US");
    const US_json = JSON.parse(res.data.countryBounds.geoJson);
    setUSBoundaries(US_json);
  };

  const fetchDistricting = async () => {
    const res = await axios.get(
      "http://localhost:8080/districting/" + districtingId
    );
    const result = res.data;

    // Setting districts info
    // result.districtBounds.forEach((element) => {
    //   element.geoJson = JSON.parse(element.geoJson);
    // });
    // setDistrictBounds(result.districtBounds);
    result.forEach((element) => {
      element.districtBounds.geoJson = JSON.parse(
        element.districtBounds.geoJson
      );
    });
    setDistrictsData(result);

    if (districtingsChanged != 0) {
      setShowGeorgiaDistricts(false);
      setShowGeorgiaDistricts(true);
    }
    setDistrictingsChanged(districtingsChanged + 1);

    // Setting precincts info
    const res2 = await axios.get("http://localhost:8080/precincts");
    const result2 = res2.data;
    result2.forEach((element) => {
      element.precinctBounds.geoJson = JSON.parse(
        element.precinctBounds.geoJson
      );
    });
    setPrecinctData(result2);
  };

  const fetchConstrainedJob = async (constraints) => {
    const popType = constraints[0];
    const minority = constraints[1];
    const mmDistricts = constraints[2];
    const threshold = constraints[3];
    const compactValue = constraints[4];
    const equalPopulationThreshold = constraints[5];
    const incumbents = constraints[6];

    const res = await axios.get(
      "http://localhost:8080/constraints/" +
        popType +
        "/" +
        minority +
        "/" +
        mmDistricts +
        "/" +
        threshold +
        "/" +
        compactValue +
        "/" +
        equalPopulationThreshold +
        "/" +
        incumbents
    );
    const result = res.data;

    const afterEachConstraint = [
      result.afterEqualPopThres,
      result.afterMinority,
      result.afterCompactness,
      result.afterIncuments,
      result.remaining,
    ];
    emitter.emit("constrainedJob", { job: afterEachConstraint });

    const ids = result.ids;
    const info = result.info;
    setConstrainedIds(ids);
    setConstrainedInfo(info);

    // Sorting based on different measures
    const compactnesses = [];
    const geoDevs = [];
    const popDevs = [];
    const avgDevs = [];
    let counter = 0;
    result.info.forEach((dI) => {
      compactnesses[counter] = dI[0];
      geoDevs[counter] = dI[1];
      popDevs[counter] = dI[2];
      avgDevs[counter] = dI[3];
      counter += 1;
    });

    // Sorting based on compactness
    compactnesses.sort(function (a, b) {
      return a - b;
    });
    setTopCompactnesses(compactnesses.reverse());

    const cIds = [];
    compactnesses.forEach((cVal) => {
      let counter = 0;
      info.forEach((dI) => {
        if (cVal == dI[0]) cIds.push(ids[counter]);
        counter += 1;
      });
    });
    setTopCompactnessesIds(cIds);

    // Sorting based on geometric deviation
    geoDevs.sort(function (a, b) {
      return a - b;
    });
    setTopGeoDevs(geoDevs);

    const geoIds = [];
    geoDevs.forEach((gVal) => {
      let counter = 0;
      info.forEach((dI) => {
        if (gVal == dI[1]) geoIds.push(ids[counter]);
        counter += 1;
      });
    });
    setTopGeoDevsIds(geoIds);

    // Sorting based on population deviation
    popDevs.sort(function (a, b) {
      return a - b;
    });
    setTopPopDevs(popDevs);

    const popIds = [];
    popDevs.forEach((pVal) => {
      let counter = 0;
      info.forEach((dI) => {
        if (pVal == dI[2]) popIds.push(ids[counter]);
        counter += 1;
      });
    });
    setTopPopDevsIds(popIds);

    // Sorting based on demographic deviation from average
    avgDevs.sort(function (a, b) {
      return a - b;
    });
    setTopAvgDevs(avgDevs);

    const avgIds = [];
    avgDevs.forEach((aVal) => {
      let counter = 0;
      info.forEach((dI) => {
        if (aVal == dI[3]) avgIds.push(ids[counter]);
        counter += 1;
      });
    });
    setTopAvgDevsIds(avgIds);
  };

  const calcOFScores = (weights) => {
    const OFScores = [];
    setConstrainedInfo((info) => {
      info.forEach((dI) => {
        let score =
          dI[0] * weights[0] +
          dI[1] * weights[1] +
          dI[2] * weights[2] +
          dI[3] * weights[3];
        OFScores.push(score);
      });
      const temp = [];
      OFScores.forEach((score) => {
        temp.push(score);
      });

      OFScores.sort(function (a, b) {
        return a - b;
      });
      setTopOFs(OFScores.reverse());

      setConstrainedIds((ids) => {
        const scoreIds = [];
        OFScores.forEach((score) => {
          let counter = 0;
          temp.forEach((val) => {
            if (score == val) scoreIds.push(ids[counter]);
            counter += 1;
          });
        });
        setTopOFIds(scoreIds);
        return ids;
      });
      return info;
    });
    console.log(OFScores);
  };

  useEffect(() => {
    if (topOFs.length !== 0 && topOFIds !== 0) {
      emitter.emit("sortingInfo", {
        sortingInfo: {
          topOFs,
          topOFIds,
          topCompactnesses,
          topCompactnessesIds,
          topGeoDevs,
          topGeoDevsIds,
          topPopDevs,
          topPopDevsIds,
          topAvgDevs,
          topAvgDevsIds,
        },
      });
    }
  }, [
    topOFs,
    topOFIds,
    topCompactnesses,
    topCompactnessesIds,
    topGeoDevs,
    topGeoDevsIds,
    topPopDevs,
    topPopDevsIds,
    topAvgDevs,
    topAvgDevsIds,
  ]);

  useEffect(() => {
    emitter.on("showCurrentDistricting", (payload) => {
      const id = payload.id;
      setDistrictingId(id);
    });
  }, []);

  useEffect(() => {
    emitter.on("showEnactedDistricting", (payload) => {
      const id = payload.id;
      setDistrictingId(id);
    });
  }, []);

  useEffect(() => {
    fetchDistricting();
  }, [districtingId]);

  useEffect(() => {
    fetchCountry();
  }, []);

  const countryStyle = {
    fillColor: "white",
    color: "gray",
    weight: 1,
  };

  const GeorgiaStyle = {
    fillColor: "lightblue",
    fillOpacity: 0.3,
    color: "black",
    weight: 2,
  };

  const onEachState = (state, layer) => {
    const stateName = state.properties.name;
    if (stateName == "Georgia") {
      layer.setStyle(GeorgiaStyle);
    }
    layer.on({
      click: (e) => {
        if (stateName == "Georgia") {
          setShowGeorgia(true);
          fetchDistricting();
          setShowGeorgiaDistricts(true);
        }
      },
    });
  };

  useEffect(() => {
    emitter.emit("districtsData", { data: districtsData });
  }, [districtsData]);

  useEffect(() => {
    emitter.on("nevadaDistrictsChecked", (payload) => {
      if (payload.displayDistricts) {
        fetchDistricting();
      }
      setShowGeorgiaDistricts(payload.displayDistricts);
    });
  }, []);

  useEffect(() => {
    emitter.on("nevadaChecked", (payload) => {
      if (!payload.nevadaChecked) {
        setShowGeorgiaPrecincts(payload.nevadaChecked);
      }
      if (payload.nevadaChecked) {
        fetchDistricting();
      }
      setShowGeorgiaDistricts(payload.nevadaChecked);
      setShowGeorgia(payload.nevadaChecked);
    });
  }, []);

  useEffect(() => {
    emitter.on("nevadaPrecinctsChecked", (payload) => {
      setShowGeorgiaPrecincts(payload.displayPrecincts);
    });
  }, []);

  useEffect(() => {
    emitter.on("applyContraints", (payload) => {
      fetchConstrainedJob(payload.constraints);
    });
  }, []);

  useEffect(() => {
    emitter.on("applyWeights", (payload) => {
      calcOFScores(payload.weights);
    });
  }, []);

  // useEffect(() => {
  //   if (districtsData.length !== 0) {
  //     districtsData.forEach((district) => {
  //       console.log(district.totalPop);
  //     });
  //   }
  // }, [districtsData]);

  return (
    <div>
      <UserSideNav nevadaChecked={showGeorgia} />
      <MapContainer
        style={{ height: "100vh" }}
        zoom={5}
        center={mapCenter}
        maxBounds={latLngBounds(SOUTH_WEST, NORTH_EAST)}
        maxBoundsViscosity={0.5}
        zoomControl={false}
      >
        <GeoJSON
          key={hash(USBoundaries)}
          style={countryStyle}
          data={USBoundaries?.features}
          onEachFeature={onEachState}
        />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showGeorgiaDistricts ? <ChangeCenterToGeorgia /> : null}
        {/* {showGeorgiaDistricts ? <GeorgiaDistricts /> : null} */}
        {/* {showGeorgiaPrecincts ? <GeorgiaPrecincts /> : null} */}
        {!showGeorgia ? <ChangeCenterToUSA /> : null}
        {!showGeorgia ? !(<GeorgiaDistricts />) : null}
        {/* {showGeorgiaDistricts &&
          districtBounds.map((bounds) => (
            <GeorgiaDistricts
              key={districtBounds.id}
              data={bounds}
              totalPops={districtsInfo[0]}
              blackPops={districtsInfo[1]}
              hispPops={districtsInfo[2]}
              asianPops={districtsInfo[3]}
              currIds={districtsInfo[4]}
            />
          ))} */}
        {showGeorgiaDistricts &&
          districtsData.map((district) => (
            <GeorgiaDistricts
              key={district.id}
              data={district.districtBounds}
              districtingId={districtingId}
              totalPop={Intl.NumberFormat().format(district.totalPop)}
              blackPop={Intl.NumberFormat().format(district.blackPop)}
              hispPop={Intl.NumberFormat().format(district.hispPop)}
              asianPop={Intl.NumberFormat().format(district.asianPop)}
              currId={district.corr_ids}
            />
          ))}
        {showGeorgiaPrecincts &&
          precinctData.map((precinct) => (
            <GeorgiaPrecincts
              key={precinct.id}
              data={precinct.precinctBounds}
              asian={Intl.NumberFormat().format(precinct.asian)}
              asianvap={Intl.NumberFormat().format(precinct.asianvap)}
              black={Intl.NumberFormat().format(precinct.black)}
              bvap={Intl.NumberFormat().format(precinct.bvap)}
              hisp={Intl.NumberFormat().format(precinct.hisp)}
              hvap={Intl.NumberFormat().format(precinct.hvap)}
            />
          ))}
      </MapContainer>
    </div>
  );
};

export default MyMap;
