import { createSlice } from '@reduxjs/toolkit';

export type CounterState = {
    isLoading: boolean;
}

const initialState: CounterState = {
    isLoading: false,
};

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
    },
    extraReducers: () => {

    },
});

export const { } = homeSlice.actions;
export default homeSlice.reducer; 
