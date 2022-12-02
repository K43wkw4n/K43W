import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { useEffect } from "react";
import { setScreen, signInUser } from "./accountSlice";
import { Link } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form"; 
import { Routers } from "../../App";

const theme = createTheme();

export default function Login() {
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setScreen());

    return () => {
      dispatch(setScreen());
    };
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isValid },
  } = useForm<{ username: ""; password: "" }>({ mode: "all" });

  //FieldValues คือ ค่าทั้งหมดภายใน Form
  async function submitForm(data: FieldValues) {
    try {
      await dispatch(signInUser(data));
      Routers.navigate('/'); //มาจาก index.tsx
    } catch (error) {
      console.log(error);
    }
  }

  // const { user } = useAppSelector((state) => state.account);

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        {/* <CssBaseline /> */}
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(submitForm)}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                label="username"
                autoFocus
                {...register("username", { required: "Username is required" })}
                error={!!errors.username} //!! = boolean
                helperText={errors?.username?.message}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                autoComplete="current-password"
                {...register("password", { required: "Password is required" })}
                error={!!errors.password}
                helperText={errors?.password?.message}
              />
              <Button
                disabled={!isValid}
                //loading={isSubmitting}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            </Box>
            <Button

              fullWidth
              sx={{ mt: 3, mb: 2 }}
              onClick={()=>Routers.navigate(-1)}
            >
              Back To Home
            </Button>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
