
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
                initialLocus: action.payload.locus,
                locus: action.payload.locus,
            };

        case "FILTER":
            if (action.payload === "all")
                return {
                    ...state,
                    locus: state.initialLocus
                };
            return {
                ...state,
                locus: state.initialLocus.filter((item) => item.category === action.payload)
            };

        default:
            return state;
    }
};

export default locusReducer;