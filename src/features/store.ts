// import { configureStore } from '@reduxjs/toolkit';
// import itemReducer from './itemSlice'; // Correct the import to itemSlice

// export const store = configureStore({
//   reducer: {
//     items: itemReducer,  // Using the correct reducer here
//   },
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;


import { configureStore } from '@reduxjs/toolkit';
import itemReducer from './itemSlice'; // Ensure correct path to your slice

export const store = configureStore({
  reducer: {
    items: itemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
