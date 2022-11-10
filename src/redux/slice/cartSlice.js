import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
     cartItems : localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
     cartTotalQantity : 0,
     cartTotalAmount : 0,
     previousURL : ""
     
}

const cartSlice = createSlice({
    name : "cart",
    initialState,
    reducers : {
      ADD_TO_CART : (state , action) => {
       const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)
       
   
        if(productIndex >= 0){
          // item already exists in the cart
          // just increase the cartQuanity
          state.cartItems[productIndex].cartQuanity += 1
          toast.info(`${action.payload.name} increase by one` , {position : "top-left"})
        }else{
          //item doesn't exists in the cart
          //add item to the cart
          const tempProduct = {...action.payload , cartQuanity : 1}
          state.cartItems.push(tempProduct)
          toast.success(`${action.payload.name} added to cart` , {position : "top-left"})
          console.log(tempProduct)
        }
        //save cart to LocalStorage
       localStorage.setItem("cartItems" , JSON.stringify(state.cartItems))
      },
      GET_TOTAL_QUANTITY : (state , action) => {
        const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)
        const totalQuantity = state.cartItems[productIndex].cartQuanity
        console.log(totalQuantity)
      },
      DECREASE_CART : (state , action) => {
        const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)
        if(state.cartItems[productIndex].cartQuanity > 1){
         state.cartItems[productIndex].cartQuanity -= 1
         toast.info(`${action.payload.name} decreased by one` , {position : "top-left"})
        }else if(state.cartItems[productIndex].cartQuanity === 1){
            const newCartItem = state.cartItems.filter((item) => {
                return item.id !== action.payload.id
            })
            state.cartItems = newCartItem
            toast.info(`${action.payload.name} removed from cart` , {position : "top-left"})
        }
        localStorage.setItem("cartItems" , JSON.stringify(state.cartItems)) 
      },
      DELETE_ITEM : (state , action) => {
        const newCartItem = state.cartItems.filter((item) => {
            return item.id !== action.payload.id
        })
        state.cartItems = newCartItem
        localStorage.setItem("cartItems" , JSON.stringify(state.cartItems)) 
        toast.info(`${action.payload.name} removed from cart` , {position : "top-left"})
      },
      DELETE_ALL_ITEM : (state , action) => {
        state.cartItems = []
        toast.info(`cart cleared` , {position : "top-left"})
        localStorage.setItem("cartItems" , JSON.stringify(state.cartItems)) 
      },
      CALCULATE_SUBTOTAL : (state, action) => {
        const array = []
        state.cartItems.map((item , index) => {
            const {price , cartQuanity} = item
            let cartItemsAmout = price * cartQuanity
            return array.push(cartItemsAmout)
            
        })
        let Subtotal = 0
        array.map((item) => {
            return Subtotal += item
        })
       state.cartTotalAmount = Subtotal
      },
      CART_TOTAL_QUANTITY : (state, action ) => {
        const array = []
        state.cartItems.map((item) => {
            const {cartQuanity} = item
            return array.push(cartQuanity)
        })
        let totalQuantity = 0
        array.map((item) => {
            return totalQuantity += item
        })
       state.cartTotalQantity = totalQuantity
      },
      SAVE_URL : (state , action) => {
        state.previousURL = action.payload
        console.log(action.payload)
      }
     }
})

export const {ADD_TO_CART , GET_TOTAL_QUANTITY , DECREASE_CART ,DELETE_ITEM , DELETE_ALL_ITEM ,CALCULATE_SUBTOTAL ,CART_TOTAL_QUANTITY ,  SAVE_URL} = cartSlice.actions

export const seletctCartItems = (state) => state.cart.cartItems
export const seletctCartTotalQuantity= (state) => state.cart.cartTotalQantity
export const seletctCartTotalAmount= (state) => state.cart.cartTotalAmount
export const seletctPReviousURL= (state) => state.cart.previousURL

export default cartSlice.reducer