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
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}