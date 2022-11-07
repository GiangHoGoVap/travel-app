import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  // Actions that allow us to modify the global store
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex((item) => item._id === action.payload._id);
      let newBasket = [...state.items];
      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.log(`Cannot remove product (id : ${action.payload._id}) as its not in the basket`);
      }
      state.items = newBasket;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectBasketItems = (state) => state.order.items;

export const selectBasketItemsWithId = (state, _id) =>
  state.order.items.filter((item) => item._id === _id);

export const selectBasketTotal = (state) =>
  state.order.items.reduce((total, currItem) => (total += currItem.price), 0);

export default basketSlice.reducer;
