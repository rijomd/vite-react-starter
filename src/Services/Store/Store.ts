import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import Module from "../../Modules";

import customizationReducer from 'Themes/Reducer/customizationSlice';

// Adding reducers of each modules
let reducer = {};
for (const item in Module) {
  const reducers = Module[item].reducer;
  reducer = {
    ...reducer,
    [item]: reducers,
  };
}
if (Object.keys(reducer).length !== 0) {
  reducer = { ...reducer, customization: customizationReducer };
}

export const store = configureStore({
  reducer: reducer,
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
