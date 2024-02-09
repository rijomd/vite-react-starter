
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { config } from "Services/Config/Config";

export type TypesCustomization = {
    isOpen: any[],
    defaultId: string,
    fontFamily: string,
    borderRadius: number
    opened: boolean,
    pageStyle: { [others: string]: any; },
    mainOutlineStyle: { [others: string]: any; },
    navType: string
}

const initialState: TypesCustomization = {
    isOpen: [],
    defaultId: 'default',
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    opened: true,
    pageStyle: {},
    mainOutlineStyle: {},
    navType: 'light'
};

export const customizationSlice = createSlice({
    name: 'customization',
    initialState,
    reducers: {
        openMenu: (state, action: PayloadAction<number | string>) => {
            state.isOpen = [action.payload];
        },
        setFontFamily: (state, action: PayloadAction<string>) => {
            state.fontFamily = action.payload;
        },
        openDrawer: (state, action: PayloadAction<boolean>) => {
            state.opened = action.payload;
        },
        // currently not 
        setPageOutlineDivTheme: (state, action: PayloadAction<any>) => {
            state.pageStyle = { ...state.pageStyle, ...action.payload }
        },
        // currently not 
        setMainOutlineDivTheme: (state, action: PayloadAction<any>) => {
            state.mainOutlineStyle = { ...state.mainOutlineStyle, ...action.payload }
        }
    },
});

export const { openDrawer, setFontFamily, openMenu, setPageOutlineDivTheme, setMainOutlineDivTheme } = customizationSlice.actions;
export default customizationSlice.reducer; 
