import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://disease.sh/v3/covid-19';

const createRequest = (url) => ({ url })

export const covidApi = createApi({
    reducerPath: 'covidApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCorona: builder.query({
            query: () => createRequest('/allaaa')
        })
    })

})
export const { useGetCoronaQuery } = covidApi;