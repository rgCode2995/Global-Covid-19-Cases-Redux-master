import { configureStore } from "@reduxjs/toolkit";

import { covidApi } from "./services/covidApi";
import { countryApi } from "./services/countryApi";
import { countriesApi} from './services/countries'

export const store = configureStore({
    reducer: {
        [covidApi.reducerPath]: covidApi.reducer,
        [countryApi.reducerPath]: countryApi.reducer,
        [countriesApi.reducerPath]: countriesApi.reducer
    },
});
