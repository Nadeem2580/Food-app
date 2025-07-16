import * as React from "react";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  Typography,
  TextField,
  MenuItem,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { BASE_URL, toaster } from "../../Utils/Utility";
import Cookies from "js-cookie";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

const categories = ["Italian", "Chinese", "Indian", "Mexican", "Thai", "Other"];

export default function UpdateModal({open,
setOpen,
restaurant,
setIsRefresh,
isRefresh}) {
  const schema = yup.object({
    restaurantName: yup.string().required(),
    details: yup.string().required(),
    contactNumber: yup.string().required(),
    address: yup.string().required(),
    email: yup.string().required(),
    category: yup.string().required(),
  });

  const { handleSubmit, reset, control } = useForm({
    defaultValues: {
      restaurantName: "",
      details: "",
      contactNumber: "",
      address: "",
      email: "",
      category: "",
    },
    resolver: yupResolver(schema),
  });

  const handleClose = () => setOpen(false);

  const onSubmit = async (obj) => {
    console.log(obj, "object");
    console.log(restaurant, "restaurant");

    
};
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Typography
              variant="h5"
              textAlign="center"
              color="error"
              sx={{ textDecoration: "underline" }}
            >
   update your registration
            </Typography>

            <Controller
              name="restaurantName"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label="Restaurant Name"
                  fullWidth
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />

            <Controller
              name="details"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label="Detail"
                  multiline
                  minRows={3}
                  fullWidth
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />

            <Controller
              name="contactNumber"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label="Contact"
                  fullWidth
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />

            <Controller
              name="address"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label="Address"
                  fullWidth
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  label="Email"
                  fullWidth
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                />
              )}
            />

            <Controller
              name="category"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <TextField
                  select
                  label="Category"
                  fullWidth
                  {...field}
                  error={!!error}
                  helperText={error?.message}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
