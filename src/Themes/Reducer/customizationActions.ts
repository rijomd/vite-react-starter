import { RootState, AppThunk } from "Services/Store/Store";
import { setFontFamily, openDrawer, openMenu } from "../Reducer/customizationSlice";

export const getCustomizationState = (state: RootState) => state.customization;

export const setFontFamilyAction = (data: string): AppThunk =>
    (dispatch) => { dispatch(setFontFamily(data)); }

export const setOpenDrawerAction = (data: boolean): AppThunk =>
    (dispatch) => { dispatch(openDrawer(data)); }

export const setOpenMenuAction = (data: number | string): AppThunk =>
    (dispatch) => { dispatch(openMenu(data)); }