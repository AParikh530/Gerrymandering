import { useState, useEffect } from 'react'
import ReactMapGL, { Source, Layer, Marker, Popup } from 'react-map-gl'
import { Button, Icon } from 'react-materialize'
import MyMap from './components/MyMap'

function App() {

  return (

    <div>
      <MyMap />
    </div>
  );
}

export default App;