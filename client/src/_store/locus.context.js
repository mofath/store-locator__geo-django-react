import React, { useReducer, createContext, useEffect } from 'react';
import locusReducer from './locus.reducer';

export let INITIAL_STATE = {
    isLoaded: null,
    locus: [],
};

const LocusContext = createContext(INITIAL_STATE);

const LocusProvider = ({ children }) => {
    const [state, dispatch] = useReducer(locusReducer, INITIAL_STATE)

    return <LocusContext.Provider value={{ state, dispatch }}>
        {children}
    </LocusContext.Provider>
}

export { LocusContext, LocusProvider };