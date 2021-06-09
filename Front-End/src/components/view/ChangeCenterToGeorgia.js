import { useMap } from "react-leaflet";

function ChangeCenterToGeorgia() {
  const map = useMap();
  const GEORGIA_CENTER = [32, -82];

  map.setView(GEORGIA_CENTER, 7);

  return null;
}

export default ChangeCenterToGeorgia;
