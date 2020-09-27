import React, { useContext } from 'react';

import MapContainer from './Components/MapContainer/MapContainer';
import PreLoader from './Components/PreLoader/PreLoader';
import { LocusContext } from '../_store/locus.context';
import { useFetch } from './fetchHook';

const App = () => {
  const { HaveUserLoci, UserLocation, updateUserLocation } = useFetch();
  const { dispatch, state } = useContext(LocusContext);
  const filterLocus = (filter) => dispatch({ type: "FILTER", payload: filter });

  return (
    <div className="app">
      {
        state.isLoaded ?
          <MapContainer
            isLoaded={state.isLoaded}
            locus={state.locus}
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
