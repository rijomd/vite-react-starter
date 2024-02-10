import React, { lazy, FC, useMemo, Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

import containers from "../../Modules";
import { getAuthToken } from "../Methods/AuthMethods";

import { NavigationScroll } from "Layout/NavigationScroll";
import { AuthLayout } from 'Layout/AuthLayout';
import { MainLayout } from 'Layout/MainLayout';

import { LazyLoader } from "Components/Loader/LazyLoader";
import { ErrorNotFound } from 'Components/Extend/ErrorNotFound';

import Themes from 'Themes/Components/Theme';
import { getCustomizationState } from "Themes/Reducer/customizationActions";

import { useAppSelector } from "Services/Hook/Hook";
import { config } from 'Services/Config/Config';

type PropType = {
  component: React.FC;
  auth: boolean;
};

export const GeneralRoutes = React.memo(() => {
  const Login = lazy(() => import("../../Modules/Auth/Views/Login"));
  const customizationState = useAppSelector(getCustomizationState);

  const PrivateRoute: FC<PropType> = ({ component: Component, auth: Auth, }) => {
    if (Auth) {
      const data = getAuthToken();
      if (data) { return <Component />; }
      else { return <Navigate to={`/login`} />; }
    }
    return <Component />;
  };

  const renderGeneratedRoutes = useMemo(() => {
    let element = [];
    for (let data in containers) {
      let router = containers[data].router;
      let moduleName = containers[data].moduleName;
      // let parentModuleName = containers[data].moduleName;

      for (let item of router) {
        let elementPath = item.elementPath;
        const name = item.name;
        let auth = item.auth;
        if (moduleName && elementPath) {
          const generated = lazy(() => import(`../../Modules/${moduleName}/Views/${elementPath}.tsx`));     /* @vite-ignore */
          element.push(
            <Route key={name} element={<MainLayout />}>
              <Route
                path={`${item.path}`}
                element={<PrivateRoute component={generated} auth={auth} />}
              />
            </Route>
          );
        }
      }
    }
    return element;
  }, [window?.location?.pathname]);

  return (
    <BrowserRouter basename={config.basename}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={Themes(customizationState)}>
          <CssBaseline />
          <NavigationScroll>

            <Suspense fallback={<LazyLoader />}>
              <Routes>
                <Route element={<AuthLayout />}>
                  <Route path={`/login`} element={<Login />} />
                </Route>
                {renderGeneratedRoutes}
                <Route element={<MainLayout />}>
                  <Route path="*" element={<ErrorNotFound />} />
                </Route>

              </Routes>
            </Suspense>

          </NavigationScroll>
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
  );
});
