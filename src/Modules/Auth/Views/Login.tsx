import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Divider, Grid, Stack, Typography, useMediaQuery } from "@mui/material";
import { ToastContainer } from "react-toastify";

import { AuthWrapper } from "../Components/AuthWrapper";
import { AuthCardWrapper } from "../Components/AuthCardWrapper";
import { AuthLogin } from "../Components/Forms/AuthLogin";
import { AuthFooter } from "../Components/AuthFooter";

import { loginAction, authenticationState } from "../Reducer/AuthAction";

import { Logo } from "Components/LogoSection/Logo";
import { useAppDispatch, useAppSelector } from "Services/Hook/Hook";
import { useNotify } from "Services/Hook/useNotify";
import { config } from 'Services/Config/Config';

const Login = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const authentication = useAppSelector(authenticationState);

  React.useEffect(() => {
    if (authentication.status === "success") {
      useNotify(authentication.error, "success");
      navigate(config.defaultPath);
    }
    if (authentication.status === "failed") {
      useNotify(authentication.error, "error");
    }
    return () => { };
  }, [authentication.status]);

  const handleSubmit = async (data: any) => {
    try {
      dispatch(loginAction(data));
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return (
    <AuthWrapper>
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        sx={{ minHeight: "100vh" }}
      >
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ minHeight: "calc(100vh - 68px)" }}
          >
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid
                  container
                  spacing={2}
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item sx={{ mb: 3 }}>
                    <Link to="#">
                      <Logo />
                    </Link>
                  </Grid>

                  <Grid item xs={12}>
                    <Grid
                      container
                      direction={matchDownSM ? "column-reverse" : "row"}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <Stack
                          alignItems="center"
                          justifyContent="center"
                          spacing={1}
                        >
                          <Typography
                            color={theme.palette.secondary.main}
                            gutterBottom
                            variant={matchDownSM ? "h3" : "h2"}
                          >
                            Hi, Welcome Back
                          </Typography>
                          <Typography
                            variant="caption"
                            fontSize="16px"
                            textAlign={matchDownSM ? "center" : "inherit"}
                          >
                            Enter your credentials to continue
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <AuthLogin handleSubmit={handleSubmit} />
                  </Grid>

                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  <Grid item xs={12}>
                    <Grid
                      item
                      container
                      direction="column"
                      alignItems="center"
                      xs={12}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{ textDecoration: "none" }}
                      >
                        Don&apos;t have an account?
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
      <ToastContainer />
    </AuthWrapper>
  );
};

export default Login;
