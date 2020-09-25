import React, { useState, useEffect, useContext } from 'react';
import MapContainer from './Components/MapContainer/MapContainer';
import { getLocus, getUserLocation } from '../_services/services';
import { LocusContext } from '../_store/locus.context';

const App = () => {
  const [Position, setPosition] = useState({ lat: 30.043489, lng: 31.235291 });
  const [HaveUserLoci, setHaveUserLoci] = useState(false);
  const [ActiveLoci, setActiveLoci] = useState(null);
  const { dispatch, state } = useContext(LocusContext);
  const updateActiveLoci = (loci) => setActiveLoci(loci);

  const userLocation = async () => {
    const { location } = await getUserLocation().read();
    setPosition(Position => ({ ...Position, lat: location.lat, lng: location.lng }));
    setHaveUserLoci(true);
  }

  useEffect(() => userLocation(), []);

  useEffect(() => {
    (async () => {
      dispatch({ type: "LOCUS_LOADING" })
      const { results } = await getLocus().read();
      dispatch({ type: "LOCUS_LOADED", payload: { locus: results } })
    })()
  }, [])

  return (
    <div className="app">
      <MapContainer
        position={Position}
        locus={state.locus}
        activeLoci={ActiveLoci}
        updateActiveLoci={updateActiveLoci}
        userLoci={HaveUserLoci}
      />
    </div>
  )
}

export default App;
