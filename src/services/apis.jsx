const BASE_URL = "http://localhost:4000/api/v1"

// categories Api
export const categories = {
    CATEGORIES_API: BASE_URL + "/course/showAllCategories",
}

// auth endpoints
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendOTP",
    SIGNUP_API: BASE_URL + "/auth/signUp",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/resetPasswordToken",
    RESETPASSWORD_API: BASE_URL + "/auth/resetPassword",
}

// contact us api
export const contactusEndpoint = {
    CONTACT_US_API: BASE_URL + "/reach/contact",
}


// RATINGS AND REVIEWS
export const ratingsEndpoints = {
    REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
}