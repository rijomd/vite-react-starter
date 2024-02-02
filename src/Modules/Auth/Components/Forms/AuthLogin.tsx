import { useState } from "react";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useTheme } from "@mui/material/styles";
import { Box, Button, Divider, Grid, IconButton, Typography, useMediaQuery } from "@mui/material";

import * as Yup from "yup";
import { Formik } from "formik";

import { AnimateButton } from "Components/Extend/AnimateButton";
import { FormTextField } from "Components/FormElements/FormTextField";
import { FormButtonField } from "Components/FormElements/FormButtonField";

import { getCustomizationState } from "Themes/Reducer/customizationActions";
import { useAppSelector } from "Services/Hook/Hook";

import Google from "Assets/images/social-google.svg";

export const AuthLogin = ({ handleSubmit }: { handleSubmit: (data: any) => any; }) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const customization = useAppSelector(getCustomizationState);

  const googleHandler = async () => {
    console.error("Login");
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <AnimateButton>
            <Button
              disableElevation
              fullWidth
              onClick={googleHandler}
              size="large"
              variant="outlined"
              sx={{
                color: "grey.700",
                backgroundColor: theme.palette.grey[50],
                borderColor: theme.palette.grey[100],
              }}
            >
              <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                <img
                  src={Google}
                  alt="google"
                  width={16}
                  height={16}
                  style={{ marginRight: matchDownSM ? 8 : 16 }}
                />
              </Box>
              Sign in with Google
            </Button>
          </AnimateButton>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ alignItems: "center", display: "flex" }}>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            <Button
              variant="outlined"
              sx={{
                cursor: "unset",
                m: 2,
                py: 0.5,
                px: 7,
                borderColor: `${theme.palette.grey[100]} !important`,
                color: `${theme.palette.grey[900]}!important`,
                fontWeight: 500,
                borderRadius: `${customization.borderRadius}px`,
              }}
              disableRipple
              disabled
            >
              OR
            </Button>
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">
              Sign in with Email address
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Grid container direction="column" justifyContent="center">
        <Formik
          initialValues={{
            email: "Admin@gmail.com",
            password: "Admin@7034",
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Must be a valid email")
              .max(255)
              .required("Email is required"),
            password: Yup.string().max(255).required("Password is required"),
          })}
          onSubmit={handleSubmit}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            touched,
            values,
          }) => (
            <form noValidate onSubmit={handleSubmit}>
              <Grid item xs={12} sx={{ marginTop: "10px" }}>
                <FormTextField
                  id="outlined-adornment-email-login"
                  label="Email Address"
                  placeholder="Email Address"
                  name="email"
                  type="email"
                  fullWidth={true}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required={true}
                  error={{
                    isError: Boolean(touched.email && errors.email),
                    errorMsg: errors.email,
                  }}
                  value={values.email}
                />
              </Grid>

              <Grid item xs={12} sx={{ marginTop: "10px" }}>
                <FormTextField
                  id="outlined-adornment-password-login"
                  label="Password"
                  placeholder="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  fullWidth={true}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required={true}
                  error={{
                    isError: Boolean(touched.password && errors.password),
                    errorMsg: errors.password,
                  }}
                  value={values.password}
                  endAdornment={
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      size="large"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  }
                />
              </Grid>

              <Box sx={{ mt: 2 }}>
                <AnimateButton>
                  <FormButtonField
                    disabled={isSubmitting}
                    fullWidth
                    type="submit"
                  >
                    Sign in
                  </FormButtonField>
                </AnimateButton>
              </Box>
            </form>
          )}
        </Formik>
      </Grid>
    </>
  );
};
