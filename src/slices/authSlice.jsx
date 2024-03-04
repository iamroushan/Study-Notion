import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
}

const authSLice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setToken(state, value){
            state.token = value.payload
        },
        setSignupData(state, value) {
            state.signupData = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
        },
    },
})

export const {setToken, setSignupData, setLoading} = authSLice.actions
export default authSLice.reducer