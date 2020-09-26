
const locusReducer = (state, action) => {
    switch (action.type) {
        case "LOCUS_LOADING":
            return {
                ...state,
                isLoaded: false,
            };

        case "LOCUS_LOADED":
            return {
                ...state,
                isLoaded: true,
                locus: action.payload.locus,
                locusSelectors: action.payload.locus,
            };

        case "FILTER":
            if (action.payload === "all")
                return {
                    ...state,
                    locusSelectors: state.locus
                };
            return {
                ...state,
                locusSelectors: state.locus.filter((item) => item.category === action.payload)
            };

        default:
            return state;
    }
};

export default locusReducer;