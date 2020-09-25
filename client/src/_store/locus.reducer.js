
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
            };

        default:
            return state;
    }
};

export default locusReducer;