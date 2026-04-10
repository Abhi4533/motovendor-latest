import { LoginRequest, LoginResponse } from '../types';
import { api } from './../../../config/api';

export const authApi = api.injectEndpoints({
  endpoints: builder => ({
    sendOtp: builder.mutation<LoginResponse, LoginRequest>({
      query: body => ({
        url: 'sendOTP',
        method: 'POST',
        body,
      }),
    }),

    verifyOtp: builder.mutation<any, any>({
      query: body => ({
        url: 'validateOTP',
        method: 'POST',
        body,
      }),
    }),
    onboarding: builder.mutation<any, any>({
      query: body => ({
        url: 'VendorOnboarding',
        method: 'POST',
        body,
      }),
    }),
    getPincode: builder.mutation<any, { pincode: string }>({
      query: body => ({
        url: 'pincode',
        method: 'POST',
        body,
      }),
    }),
    bankdetails: builder.mutation<any, any>({
      query: body => ({
        url: 'vendor_Bank_kyc',
        method: 'POST',
        body,
      }),
    }),

    gstverify: builder.mutation<any, any>({
      query: body => ({
        url: 'GST',
        method: 'POST',
        body,
      }),
    }),
    vehicleverify: builder.mutation<any, any>({
      query: body => ({
        url: 'Insert_Vehicle',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useOnboardingMutation,
  useGetPincodeMutation,
  useBankdetailsMutation,
  useGstverifyMutation,
  useVehicleverifyMutation,
} = authApi;
