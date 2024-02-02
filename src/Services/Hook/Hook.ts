import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import useMediaQuery from "@mui/material/useMediaQuery";

import type { RootState, AppDispatch } from "../Store/Store";


// **************************  Redux Store ***********************
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// **************** route ******************
export const useRouting = (path: string) => {
  const navigate = useNavigate();
  navigate(path);
};

// **************************  mobile device ***********************
export const useMobile = () => {
  const useMobile = useMediaQuery("(max-width:600px)");
  return useMobile;
};

// ************************** Online status ***********************
export const useOnlineStatus = (): boolean => {
  const [isOnline, setIsOnline] = useState(true);
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    function handleOffline() {
      setIsOnline(false);
    }
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);
  return isOnline;
};

// **************************** force full rendering ***************
export const useForceUpdate = () => {
  const [, setValue] = useState(0);
  return () => setValue((value) => value + 1);
};

// ==============================|| ELEMENT REFERENCE HOOKS  ||============================== //
export const useScriptRef = () => {
  const scripted = useRef(true);
  useEffect(() => () => { scripted.current = false; }, []);
  return scripted;
};


