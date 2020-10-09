import { useState, useEffect, useContext, useRef, useCallback } from "react";

import { LocusContext } from '../_store/locus.context';
import { fetchLocus, fetchUserLocation } from '../_services/services';

const useFetch = () => {
  const { dispatch } = useContext(LocusContext);
  const timeoutRef = useRef();
  const callbackRef = useRef();

  // States
  const [HaveUserLoci, setHaveUserLoci] = useState(false);
  const [UserLocation, setUserLocation] = useState({
    lat: 30.043489, lng: 31.235291, name: "", address: ""
  });


  // Functions

  /** 
  * This function is used to be invoked at the start of the app,
  * it returns information about user location and will be stored as state
  * lat and lng will be extracted and send as query string
  * to the server to retrieve location sorted according to user location
  */
  const getUserLocation = useCallback(async () => {
    const { location } = await fetchUserLocation().read();
    setUserLocation(prevState => ({
      ...prevState,
      lat: location.lat,
      lng: location.lng,
      name: location.name,
      location: location.address
    }));
    setHaveUserLoci(true);
  }, []);

  /** 
   *  This function takes lat and lng as a parameter and pass them
   * to a service that is supposed to attachem them as query string 
   * to a request to a server to return locations
   * sorted according to user location (lat, lng)
   * */
  const getLoations = useCallback(async ({ lat, lng }) => {
    dispatch({ type: "LOCUS_LOADING" })
    const { results } = await fetchLocus({ lat, lng }).read();
    dispatch({ type: "LOCUS_LOADED", payload: { locus: results } })
  }, [dispatch])


  // Effect and invoking functions
  useEffect(() => {
    callbackRef.current = getUserLocation()
    return callbackRef.current;
  }, [getUserLocation]);

  useEffect(() => {
    if (HaveUserLoci) {
      timeoutRef.current = setTimeout(() => {
        getLoations({ lat: UserLocation.lat, lng: UserLocation.lng })
      }, 2000);

      return () => clearTimeout(timeoutRef.current);
    }
  }, [getLoations, HaveUserLoci, UserLocation.lat, UserLocation.lng]);


  return {
    HaveUserLoci,
    UserLocation,
  }
}


export { useFetch };