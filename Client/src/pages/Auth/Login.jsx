import * as yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
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
import { useLocation, useNavigate } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { BASE_URL, toaster } from "../../Utils/Utility";
import { useAppContext } from "../../Context/userContext";

const LoginPage = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { isRefresh, setIsRefresh } = useAppContext()
  const loginSchema = yup.object({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const signUpSchema = yup.object({
    fullName: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref("password")], "Passwords must match"),
    type: yup.string().required(),
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: yupResolver(isLoginPage ? loginSchema : signUpSchema),
    defaultValues: isLoginPage
      ? { email: "", password: "" }
      : {
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        type: "",
      },
  });

  const toggleForm = () => navigate(isLoginPage ? "/signup" : "/login");

  const loginFunc = async (obj) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/login`, obj);
      if (!res.data.status)
        throw toaster({ type: "error", message: res.data.message });
      Cookies.set("token", res.data.token);
      setIsRefresh(!isRefresh);
      const user = res.data.data;

      if (user.type === "admin") navigate("/admin-dashboard");
      else if (user.type === "vendor") navigate("/vendor-Restaurant");
      else if (user.type === "customer") navigate("/user-dashboard");
      toaster({ type: "success", message: "Login successful" });
      reset();
    } catch (error) {
      toaster({ type: "error", message: error?.message });
    }
  };

  const signupFunc = async (obj) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/signup`, obj);
      toaster({ type: "success", message: "Signup successful" });
      reset();
      navigate("/");
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
      <Box sx={{ width: { xs: "90%", sm: "70%", md: "50%", lg: "40%" } }}>
        <AnimatePresence mode="wait">
          {isLoginPage ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: -90 }}
              transition={{ duration: 0.5 }}
              style={{
                padding: 30,
                background: "white",
                borderRadius: 10,
                boxShadow: "0 0 20px #95ca4d",
              }}
            >
              <Typography align="center" fontSize={24} sx={{ fontSize: "25px", fontWeight: "700", color: "#3b82f6" }}>
                Login
              </Typography>
              <form onSubmit={handleSubmit(loginFunc)}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Email"
                      fullWidth
                      margin="normal"
                      {...field}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      margin="normal"
                      error={!!errors.password}
                    >
                      <InputLabel>Password</InputLabel>
                      <OutlinedInput
                        {...field}
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <VisibilityOff sx={{ color: "#3b82f6" }} />
                              ) : (
                                <Visibility sx={{ color: "#3b82f6" }} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <FormHelperText>
                        {errors.password?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2, background: "#3b82f6" }}

                >
                  Login
                </Button>
                <Button onClick={toggleForm} sx={{ mt: 1 }}>
                  <Typography variant="caption">
                    Create new account
                  </Typography>
                </Button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ opacity: 0, rotateY: 90 }}
              animate={{ opacity: 1, rotateY: 0 }}
              exit={{ opacity: 0, rotateY: -90 }}
              transition={{ duration: 0.5 }}
              style={{
                padding: 30,
                background: "white",
                borderRadius: 10,
                boxShadow: "0 0 20px #95ca4d",
              }}
            >
              <Typography align="center" fontSize={24} sx={{ color: "#3b82f6", fontWeight: "700" }}>
                Signup
              </Typography>
              <form onSubmit={handleSubmit(signupFunc)}>
                <Controller
                  name="fullName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Full Name"
                      fullWidth
                      margin="normal"
                      {...field}
                      error={!!errors.fullName}
                      helperText={errors.fullName?.message}
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      label="Email"
                      fullWidth
                      margin="normal"
                      {...field}
                      error={!!errors.email}
                      helperText={errors.email?.message}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      margin="normal"
                      error={!!errors.password}
                    >
                      <InputLabel>Password</InputLabel>
                      <OutlinedInput
                        {...field}
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton

                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <VisibilityOff sx={{ color: "#3b82f6" }} />
                              ) : (
                                <Visibility sx={{ color: "#3b82f6" }} />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <FormHelperText>
                        {errors.password?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      margin="normal"
                      error={!!errors.confirmPassword}
                    >
                      <InputLabel>Confirm Password</InputLabel>
                      <OutlinedInput
                        {...field}
                        type={showPassword ? "text" : "password"}
                      />
                      <FormHelperText>
                        {errors.confirmPassword?.message}
                      </FormHelperText>
                    </FormControl>
                  )}
                />
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <FormControl
                      fullWidth
                      margin="normal"
                      error={!!errors.type}
                    >
                      <Typography>Choose role:</Typography>
                      <RadioGroup row {...field}>
                        <FormControlLabel
                          value="vendor"
                          control={<Radio />}
                          label="Vendor"
                        />
                        <FormControlLabel
                          value="customer"
                          control={<Radio />}
                          label="Customer"
                        />
                      </RadioGroup>
                      <FormHelperText>{errors.type?.message}</FormHelperText>
                    </FormControl>
                  )}
                />
                <Button

                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ mt: 2, background: "#3b82f6" }}
                >
                  Signup
                </Button>
                <Button onClick={toggleForm} sx={{ mt: 1 }}>
                  <Typography variant="caption">
                    Already have an account? <span style={{}}>Log in</span>
                  </Typography>
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </Stack>
  );
};

export default LoginPage;
