import {createSlice} from "@reduxjs/toolkit"
import {toast} from "react-hot-toast"

const initialState = {
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")):0,
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")):[],
    total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")):0,
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        setToalItems(state, value){
            state.token = value.payload
        },

        // TODO: add to cart
        addToCart: (state, action) => {
            const course = action.payload
            const index = state.cart.findIndex((item) => item._id === course._id)

            if(index >= 0){
                toast.error("Course already in cart")
                
            }
        }
        // TODO: remove from cart
        // TODO: reset cart
    },
})

export const {setToken} = cartSlice.actions
export default cartSlice.reducer