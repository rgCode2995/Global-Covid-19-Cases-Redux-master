import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://disease.sh/v3/covid-19';

const createRequest = (url) => ({ url })

export const countriesApi = createApi({
    reducerPath: 'countriesApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCountries: builder.query({
            query: () => createRequest('/countries')
        }),
    })

})
export const { useGetCountriesQuery, } = countriesApi;