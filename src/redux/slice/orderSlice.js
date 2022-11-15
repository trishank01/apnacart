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
    },
    CALC_TOTAL_ORDER_AMOUNT : (state , action) => {
      const array = []
      state.orderHistory.map((item , index) => {
          const {orderAmount } = item
          return array.push(orderAmount)
          
      })
      const TotalAmount = array.reduce((a , b) => {
        return a + b
      }, 0)
     state.totalOrderAmount = TotalAmount
    }
  }
});

export const {STORE_ORDERS , CALC_TOTAL_ORDER_AMOUNT} = orderSlice.actions

export const selectOrderHistory = (state) => state.orders.orderHistory
export const selectTotalOrderAmount = (state) => state.orders.totalOrderAmount

export default orderSlice.reducer