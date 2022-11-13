import { createSlice } from '@reduxjs/toolkit'

const initialState = {
     orderHistory : []
}

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    STORE_ORDERS : (state , actions) => {
        //console.log(actions.payload)
        state.orderHistory = actions.payload
    }
  }
});

export const {STORE_ORDERS} = orderSlice.actions

export const selectOrderHistory = (state) => state.orders.orderHistory

export default orderSlice.reducer