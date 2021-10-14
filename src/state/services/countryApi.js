import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://disease.sh/v3/covid-19';

const createRequest = (url) => ({ url })

export const countryApi = createApi({
    reducerPath: 'countryApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCountry: builder.query({
            query: (countryCode) => createRequest(countryCode === "worldwide" ? '/all' :`/countries/${countryCode}`)
        })
    })

})
export const { useGetCountryQuery } = countryApi;  