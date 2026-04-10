import { api } from './../../../config/api';

export const queryApi = api.injectEndpoints({
  endpoints: builder => ({
    getvehicle: builder.query<any, { vendorid: string }>({
      query: ({ vendorid }) => ({
        url: 'get_vehicle',
        method: 'POST',
        body: { vendorid },
      }),
      providesTags: ['Vehicle'],
    }),
  }),
});

export const { useGetvehicleQuery } = queryApi;
// export const { useGetPincodeQuery } = api;
