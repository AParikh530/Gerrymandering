import React, { useState, useEffect } from "react";
import "../../../node_modules/leaflet/dist/leaflet.css";
import { RangeStepInput } from "react-range-step-input";
import { Select, Modal, Button, Checkbox, Table } from "react-materialize";
import {
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  Typography,
  Slider,
} from "@material-ui/core";
import emitter from "../../libs/mitt";

const Constraints = () => {
  const [equalPopulationValue, setEqualPopulationValue] = useState(20);
  const [incumbents, setIncumbents] = useState([]);
  const [compactValue, setCompactValue] = useState(0.5);
  const [minority, setMinority] = useState();
  const [MMDistricts, setMMDistricts] = useState(7);
  const [popThreshold, setPopThreshold] = useState(50);
  const [popType, setPopType] = useState();
  const [hideSummary, setHideSummary] = useState(true);
  const [constrainedJob, setConstrainedJob] = useState();

  const handleIncumbentSelected = (e) => {
    setIncumbents(incumbents.concat(e.target.value));
  };

  const handleEqualPopulationChange = (e, newValue) => {
    setEqualPopulationValue(newValue);
  };

  const handleCompactChange = (e, newValue) => {
    setCompactValue(newValue);
  };

  const handleMinorityChange = (e) => {
    setMinority(e.target.value);
  };

  const handleMMDistrictsChange = (e, newValue) => {
    setMMDistricts(newValue);
  };

  const handlePopThresholdChange = (e, newValue) => {
    setPopThreshold(newValue);
  };

  const handlePopTypeChange = (e, newValue) => {
    setPopType(newValue);
  };

  const handleButtonClick = () => {
    emitter.emit("applyContraints", {
      constraints: [
        popType,
        minority,
        MMDistricts,
        popThreshold,
        compactValue,
        equalPopulationValue,
        incumbents,
      ],
    });
  };

  useEffect(() => {
    emitter.on("constrainedJob", (payload) => {
      setConstrainedJob(payload.job);
      setHideSummary(false);
    });
  }, []);

  return (
    <div style={{ marginRight: "10px", marginLeft: "10px" }}>
      <h5>Population Constraints</h5>
      <FormControl component="fieldset">
        <FormLabel component="legend"></FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          onChange={handlePopTypeChange}
        >
          <FormControlLabel
            value="tp"
            control={<Radio />}
            label="Total Population"
          />
          <FormControlLabel
            value="tvap"
            control={<Radio />}
            label="Voting Age Population (TVAP)"
          />
          <FormControlLabel
            value="cvap"
            disabled
            control={<Radio />}
            label="Citizen Voting Age"
          />
        </RadioGroup>
      </FormControl>
      <p>Equal Population Threshold: </p>
      <Slider
        value={equalPopulationValue}
        min={0}
        step={0.01}
        max={40}
        onChange={handleEqualPopulationChange}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
      />

      <h5>Majority-Minority Districts</h5>
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
        onChange={handleMinorityChange}
      >
        <option disabled value="">
          Select Minority
        </option>
        <option value="black">Black</option>
        <option value="hispanic">Hispanic</option>
        <option value="asian">Asian</option>
      </Select>
      <Typography id="non-linear-slider" gutterBottom></Typography>
      <h7>Number of Districts: </h7>
      <Slider
        value={MMDistricts}
        min={0}
        step={1}
        max={14}
        onChange={handleMMDistrictsChange}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
      />
      <h7>Population Percentage Threshold: </h7>
      <Slider
        value={popThreshold}
        min={0}
        step={1}
        max={100}
        onChange={handlePopThresholdChange}
        valueLabelDisplay="auto"
        aria-labelledby="non-linear-slider"
      />

      <h5>Set Protected Incumbents</h5>
      <Modal
        actions={[
          <Button flat modal="close" node="button" waves="green">
            Close
          </Button>,
        ]}
        bottomSheet={false}
        fixedFooter={false}
        header="Incumbents of Georgia"
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
        trigger={<Button node="button">Select Incumbents</Button>}
      >
        <p>Select Incumbents to Protect: (Name - District)</p>
        <Table>
          <thead>
            <tr>
              <th>Republican</th>
              <th>Democrat</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Checkbox
                  id="Checkbox_6"
                  checked={false}
                  label="Buddy Carter - D1"
                  value="district_1_incumbent"
                  onChange={handleIncumbentSelected}
                />
              </td>
              <td>
                <Checkbox
                  id="Checkbox_7"
                  checked={false}
                  label="Sanford Bishop - D2"
                  value="district_2_incumbent"
                  onChange={handleIncumbentSelected}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Checkbox
                  id="Checkbox_8"
                  checked={false}
                  label="Drew Ferguson - D3"
                  value="district_3_incumbent"
                  onChange={handleIncumbentSelected}
                />
              </td>
              <td>
                <Checkbox
                  id="Checkbox_9"
                  checked={false}
                  label="Hank Johnson - D4"
                  value="district_4_incumbent"
                  onChange={handleIncumbentSelected}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Checkbox
                  id="Checkbox_10"
                  checked={false}
                  label="Austin Scott - D8"
                  value="district_8_incumbent"
                  onChange={handleIncumbentSelected}
                />
              </td>
              <td>
                <Checkbox
                  id="Checkbox_11"
                  checked={false}
                  label="Nikema Williams - D5"
                  value="district_5_incumbent"
                  onChange={handleIncumbentSelected}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Checkbox
                  id="Checkbox_12"
                  checked={false}
                  label="Andrew Clyde - D9"
                  value="district_9_incumbent"
                  onChange={handleIncumbentSelected}
                />
              </td>
              <td>
                <Checkbox
                  id="Checkbox_13"
                  checked={false}
                  label="Lucy McBath - D6"
                  value="district_6_incumbent"
                  onChange={handleIncumbentSelected}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Checkbox
                  id="Checkbox_14"
                  checked={false}
                  label="Jody Hice - D10"
                  value="district_10_incumbent"
                  onChange={handleIncumbentSelected}
                />
              </td>
              <td>
                <Checkbox
                  id="Checkbox_15"
                  checked={false}
                  label="Carolyn Bourdeaux - D7"
                  value="district_7_incumbent"
                  onChange={handleIncumbentSelected}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Checkbox
                  id="Checkbox_16"
                  checked={false}
                  label="Barry Loudermilk - D11"
                  value="district_11_incumbent"
                  onChange={handleIncumbentSelected}
                />
              </td>
              <td>
                <Checkbox
                  id="Checkbox_17"
                  checked={false}
                  label="David Scott - D13"
                  value="district_13_incumbent"
                  onChange={handleIncumbentSelected}
                />
              </td>
            </tr>
            <tr>
              <td>
                <Checkbox
                  id="Checkbox_18"
                  checked={false}
                  label="Rick Allen - D12"
                  value="district_12_incumbent"
                  onChange={handleIncumbentSelected}
                />
              </td>
              <td></td>
            </tr>
            <tr>
              <td>
                <Checkbox
                  id="Checkbox_19"
                  checked={false}
                  label="Marjorie Taylor Greene - D14"
                  value="district_14_incumbent"
                  onChange={handleIncumbentSelected}
                />
              </td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </Modal>

      <h5>Select Compactness</h5>
      <FormControl component="fieldset">
        <FormLabel component="legend"></FormLabel>
        <RadioGroup aria-label="gender" name="gender1">
          <FormControlLabel
            value="polsby-popper"
            control={<Radio />}
            label="Polsby-Popper"
          />
          <FormControlLabel
            value="graph compactness"
            disabled
            control={<Radio />}
            label="Graph Compactness"
          />
          <FormControlLabel
            value="population fatness"
            disabled
            control={<Radio />}
            label="Population Fatness"
          />
        </RadioGroup>
      </FormControl>
      <Typography id="non-linear-slider" gutterBottom></Typography>
      <Slider
        value={compactValue}
        min={0}
        step={0.01}
        max={1}
        onChange={handleCompactChange}
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
        <Button onClick={handleButtonClick}>Apply</Button>
      </div>

      <div style={hideSummary ? { display: "none" } : null}>
        <Modal
          actions={[
            <Button flat modal="close" node="button" waves="green">
              Close
            </Button>,
          ]}
          bottomSheet={false}
          fixedFooter={false}
          header="Summary of Constrained Districtings"
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
          trigger={<Button node="button">Summary</Button>}
        >
          <p>
            Table shows the number of districtings removed due to each
            constraint.
          </p>
          <p>Total Districtings at Start: 5000</p>
          <Table>
            <thead>
              <tr>
                <th>Constraint</th>
                <th>Districtings Removed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Equal Population Threshold</td>
                <td>{hideSummary ? null : constrainedJob[0]}</td>
              </tr>
              <tr>
                <td>Minority</td>
                <td>{hideSummary ? null : constrainedJob[1]}</td>
              </tr>
              <tr>
                <td>Compactness</td>
                <td>{hideSummary ? null : constrainedJob[2]}</td>
              </tr>
              <tr>
                <td>Incumbent Protection</td>
                <td>{hideSummary ? null : constrainedJob[3]}</td>
              </tr>
            </tbody>
            <p>
              Total Districtings Remaining:{" "}
              {hideSummary
                ? null
                : 5000 -
                  constrainedJob[0] -
                  constrainedJob[1] -
                  constrainedJob[2] -
                  constrainedJob[3]}
            </p>
          </Table>
        </Modal>
      </div>
    </div>
  );
};

export default Constraints;
