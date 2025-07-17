import * as yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Stack,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { BASE_URL, toaster } from "../Utils/Utility";
import axios from "axios";
import Cookies from "js-cookie";

const HomePage = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  const loginSchema = yup.object({
    email: yup
      .string()
      .email("Enter valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const signUpSchema = yup.object({
    fullName: yup.string().required("Full Name is required"),
    email: yup
      .string()
      .email("Enter valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password")], "Password must match"),
    gender: yup.string().required("Gender is required"),
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(isLoginPage ? loginSchema : signUpSchema),
    mode: "onSubmit",
    defaultValues: isLoginPage
      ? {
          email: "",
          password: "",
        }
      : {
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
          gender: "",
        },
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault();

  const toggleForm = () => {
    if (isLoginPage) {
      navigate("/signup");
    } else {
      navigate("/");
    }
  };

 

  const signupFunc = async (obj) => {
    try {
      const res = await axios.post(`${BASE_URL}/signup`, obj);
      toaster({ type: "success", message: "Signup created" });
      reset();
    } catch (error) {
      toaster({ type: "error", message: error.message });
    }
  };

  const loginFunc = async (obj) => {
    try {

      const res = await axios.post(`${BASE_URL}/api/login`, obj);
      console.log(res);
      if (!res.data.status) {
        throw toaster({ type: "error", message: res.data.message });
      }

      Cookies.set("token", res.data.token);

      toaster({ type: "success", message: "User login successfully" });
      reset();
      navigate("/vendor-dahsboard");
    } catch (error) {
      toaster({ type: "error", message: error.message });
    }
  };

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh" }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "85%", md: "65%", lg: "55%", xl: "40%" },
          position: "relative",
        }}
      >
        <AnimatePresence mode="wait">
          {isLoginPage ? (
            <motion.div
              key="login"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                boxShadow: "0 0 10px black",
                borderRadius: "10px",
                padding: 30,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                background: "white",
              }}
            >
              <Typography sx={{ textAlign: "center", fontSize: "4vmin" }}>
                Login
              </Typography>
              <form
                onSubmit={handleSubmit(loginFunc)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "30px",
                }}
              >
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Enter email ..."
                      placeholder="Enter email ..."
                      error={errors?.email}
                      helperText={errors?.email?.message}
                    />
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <FormControl variant="outlined" error={errors?.password}>
                      <InputLabel>Password</InputLabel>
                      <OutlinedInput
                        {...field}
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              onMouseUp={handleMouseUpPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                      {errors?.password && (
                        <FormHelperText>
                          {errors.password.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />

                <Box>
                  <Button variant="contained" type="submit">
                    Login
                  </Button>
                  <Button
                    onClick={toggleForm}
                    sx={{ fontSize: "12px", float: "right", cursor: "pointer" }}
                  >
                    Create new account!
                  </Button>
                </Box>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                boxShadow: "0 0 10px black",
                borderRadius: "10px",
                padding: 30,
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                background: "white",
              }}
            >
              <Typography sx={{ textAlign: "center", fontSize: "4vmin" }}>
                Signup
              </Typography>
              <form
                onSubmit={handleSubmit(signupFunc)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "30px",
                }}
              >
                <Controller
                  name="fullName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Full Name"
                      placeholder="Full Name"
                      {...field}
                      error={!!errors.fullName}
                      helperText={errors?.fullName?.message}
                    />
                  )}
                />

                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Email"
                      placeholder="Enter Email"
                      {...field}
                      error={!!errors.email}
                      helperText={errors?.email?.message}
                    />
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <FormControl variant="outlined" error={!!errors?.password}>
                      <InputLabel>Password</InputLabel>
                      <OutlinedInput
                        {...field}
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              onMouseUp={handleMouseUpPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                        placeholder="Enter your password"
                      />
                      {errors?.password && (
                        <FormHelperText>
                          {errors?.password?.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />

                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      variant="outlined"
                      error={!!errors?.confirmPassword}
                    >
                      <InputLabel>Confirm Password</InputLabel>
                      <OutlinedInput
                        {...field}
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              onMouseUp={handleMouseUpPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Confirm Password"
                      />
                      {errors?.confirmPassword && (
                        <FormHelperText>
                          {errors?.confirmPassword?.message}
                        </FormHelperText>
                      )}
                    </FormControl>
                  )}
                />

                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <FormControl component="fieldset" error={!!errors?.gender}>
                      <Typography sx={{ fontWeight: "bold" }}>
                        Gender
                      </Typography>
                      <RadioGroup row {...field}>
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="Male"
                        />
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Female"
                        />
                      </RadioGroup>
                      {errors?.gender && (
                        <FormHelperText>{errors.gender.message}</FormHelperText>
                      )}
                    </FormControl>
                  )}
                />

                <Box>
                  <Button variant="contained" type="submit">
                    Signup
                  </Button>
                  <Button
                    onClick={toggleForm}
                    sx={{ fontSize: "12px", float: "right", cursor: "pointer" }}
                  >
                    Already have an account?
                  </Button>
                </Box>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Stack>
  );
};

export default HomePage;
