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
    doctors: {
      getAll: 'api/Customer/Doctors/GetAllDoctors',
      getDetails: (id: number) => `api/Customer/Doctors/DoctorDetails/${id}`,
    },
    specialists: {
      getAllSpecialists: 'api/Customer/Specialists/GetAllSpecialists',
      getAllDoctorsSpecialists: (id: number) =>
        `api/Customer/Specialists/GetAllDoctorsInSpecialist/${id}`,
    },
    Notifications: {
      getByUser: 'api/Customer/Notifications/GetNotificationsByUser',
      markRead: (id: string) => `api/Customer/Notifications/MarkAsRead/${id}`,
    },
    NotificationSettings: {
      setting: 'api/Profile/NotificationSettings',
      toggle: 'api/Profile/NotificationSettings/toggle',
    },
    Reviews: {
      getReviews: 'api/Customer/Reviews/GetReviews',
      getReviewsByDoctorId: (doctorId: number) =>
        `api/Customer/Reviews/GetReviewsByDoctor/${doctorId}`,
      deleteReviewByDoctorId: (doctorId: number) => `api/Customer/Reviews/DeleteReview/${doctorId}`,
      addReviw: 'api/Customer/Reviews/AddReview',
      editReviewByDoctorId: (doctorId: number) => `api/Customer/Reviews/UpdateReview/${doctorId}`,
    },
    search: {
      searchDoctors: 'api/Customer/SearchData/SearchDoctors'
    },
    profile: {
      getProfile: 'api/profile/Editprofile/getprofile',
      updateProfile: 'api/profile/editprofile/updateprofile',
    },
  },
};
