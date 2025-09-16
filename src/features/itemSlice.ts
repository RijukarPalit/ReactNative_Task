

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ItemType {
  id: string;
  name: string;
  age: string;
  gender: string;
}

interface ItemsState {
  items: ItemType[];
}

const initialState: ItemsState = {
  items: [],
};

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ItemType>) => {
      state.items.push(action.payload);
    },
    updateItem: (state, action: PayloadAction<ItemType>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    setItems: (state, action: PayloadAction<ItemType[]>) => {
      state.items = action.payload;
    },
  },
});

export const { addItem, updateItem, setItems } = itemsSlice.actions;

export default itemsSlice.reducer;
