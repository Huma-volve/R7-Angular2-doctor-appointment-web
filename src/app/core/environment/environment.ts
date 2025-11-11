export const environment = {
  apiBaseUrl: 'https://cure-doctor-booking.runasp.net/',
  endpoints: {
    auth: {
      register: 'api/Identity/Accounts/register',
      verifyRegister: 'api/Identity/Accounts/verify-register',
      resendOtp: 'api/Identity/Accounts/resend-otp',
      login: 'api/Identity/Accounts/login',
      verifyLogin: 'api/Identity/Accounts/verify-login',
      googleLogin: 'api/Identity/Accounts/google-login',
      refreshToken: 'api/Identity/Accounts/refresh-token',
      logout: 'api/Identity/Accounts/logout',
    },
    paymentMethods: {
      getAll: 'api/Profile/PaymentMethods/getall',
      add: 'api/Profile/PaymentMethods/add',
      delete: 'api/Profile/PaymentMethods/delete',
      init: 'api/Profile/PaymentMethods/init',
      confirm: 'api/Profile/PaymentMethods/confirm',
    },
  },
};
