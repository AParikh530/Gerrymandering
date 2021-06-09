import { useMap } from "react-leaflet";

function ChangeCenterToUSA() {
  const map = useMap();
  const USA_CENTER = [38.5, -97];

  map.setView(USA_CENTER, 5);

  return null;
}

export default ChangeCenterToUSA;
