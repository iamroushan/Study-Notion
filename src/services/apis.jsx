const BASE_URL = "https://localhost:4000/api/v1"

// categories Api
export const categories = {
    CATEGORIES_API: BASE_URL + "/course/showAllCategories",
}

// auth endpoints
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signup",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  }