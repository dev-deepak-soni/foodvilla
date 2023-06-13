import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
    name : "cart",
    initialState : {
        items : [],
        totalPrice : 0
    },
    reducers : {
        addItem(state,action){
           const index = state.items.findIndex(x => x.id == action.payload.id);
           console.log('index',index);
           if(index > -1){
                
            state.items[index].qty += 1;

           }else{
               action.payload.qty = 1;
               state.items.push(action.payload)
           }
           state.totalPrice += action.payload.price/100;
        },
        removeItem(state,action){
            const index = state.items.findIndex(x => x.id == action.payload.id);
            if(state.items[index].qty > 1){
                state.items[index].qty -= 1; 
            }else{
                state.items = state.items.filter(x=>x.id !== action.payload.id);
            }
            state.totalPrice -= action.payload.price/100;
        },
        clearCart(state){
            state.items = [];
        }
    }
})
export default CartSlice.reducer;
export const {addItem,removeItem,clearCart} = CartSlice.actions;