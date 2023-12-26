import { configureStore } from "@reduxjs/toolkit";
import todoSlices from "./services/todoSlices";

export const makeStore = () => {
  return configureStore({
    reducer: {
      todo: todoSlices,
      user: todoSlices,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
