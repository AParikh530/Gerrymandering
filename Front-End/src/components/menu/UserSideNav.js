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
import { Menu, ExpandMore, ExpandLess } from "@material-ui/icons";
import SelectState from "./SelectState";
import Constraints from "./Constraints";
import Measures from "./Measures";
import Results from "./Results";

const UserSideNav = ({ nevadaChecked }) => {
  return (
    <div
      style={{
        backgroundColor: "lightgray",
        display: "flex",
        flexDirection: "row",
        position: "absolute", top: "0px", right: "0px", left: "0px",  zIndex: 999 
      }}
    >
      <SideNav
        id="SideNav-10"
        options={{
          draggable: true,
        }}
        trigger={
          <Button node="button">
            <Menu fontSize="large" />
          </Button>
        }
        style={{position: "fixed"}}
      >
        <Collapsible accordion>
          <CollapsibleItem
            header="Select State"
            expanded={false}
            icon={
              <Icon>
                <ExpandMore />
              </Icon>
            }
            node="div"
          >
            <SelectState nevadaChecked={nevadaChecked} />
          </CollapsibleItem>
          <CollapsibleItem
            header="Constraints"
            expanded={false}
            icon={
              <Icon>
                <ExpandMore />
              </Icon>
            }
            node="div"
          >
            <Constraints />
          </CollapsibleItem>
          <CollapsibleItem
            header="Measures"
            expanded={false}
            icon={
              <Icon>
                <ExpandMore />
              </Icon>
            }
            node="div"
          >
            <Measures />
          </CollapsibleItem>
          <CollapsibleItem
            header="Results"
            expanded={false}
            icon={
              <Icon>
                <ExpandMore />
              </Icon>
            }
            node="div"
          >
            <Results />
          </CollapsibleItem>
        </Collapsible>
      </SideNav>
    </div>
  );
};

export default UserSideNav;
