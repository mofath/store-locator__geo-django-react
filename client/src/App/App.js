import React, { useState, useEffect, useContext } from 'react';
import MapContainer from './Components/MapContainer/MapContainer';
import { getLocus, getUserLocation } from '../_services/services';
import { LocusContext } from '../_store/locus.context';
import PreLoader from './Components/PreLoader/PreLoader';

const App = () => {
  const [HaveUserLoci, setHaveUserLoci] = useState(false);
  const [UserLocation, setUserLocation] = useState({
    lat: 30.043489, lng: 31.235291, name: "", address: ""
  });
  
  const { dispatch, state } = useContext(LocusContext);

  const updateUserLocation = async () => {
    const { location } = await getUserLocation().read();
    setUserLocation(UserLocation => ({
      ...UserLocation,
      lat: location.lat, lng: location.lng,
      name: location.name, location: location.address
    }));
    setHaveUserLoci(true);
  }

  const filterLocus = (filter) => {
    dispatch({ type: "FILTER", payload: filter })
  }

  const getLoations = async ({ lat, lng }) => {
    dispatch({ type: "LOCUS_LOADING" })
    const { results } = await getLocus({ lat, lng }).read();
    dispatch({ type: "LOCUS_LOADED", payload: { locus: results } })
  };

  useEffect(() => updateUserLocation(), []);
  useEffect(() => {
    if (HaveUserLoci) getLoations({ lat: UserLocation.lat, lng: UserLocation.lng })
  }, [HaveUserLoci]);

  return (
    <div className="app">
      {
        state.isLoaded ?
          <MapContainer
            isLoaded={state.isLoaded}
            locus={state.locusSelectors}
            haveUserLoci={HaveUserLoci}
            userLocation={UserLocation}
            filter={filterLocus}
            updateUserLocation={updateUserLocation}
          />
          :
          <PreLoader />
      }
    </div>
  )
}

export default App;
