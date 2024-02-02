/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootState } from 'Services/Store/Store';

export const getHomeAction = (state: RootState) => state.home.auth;

