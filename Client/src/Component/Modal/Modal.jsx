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

export default function VendorModal({
  open,
  setOpen,
  isRefresh,
  setIsRefresh,
}) {
  const schema = yup.object({
    restaurantName: yup.string().required(),
    details: yup.string().required(),
    contactNumber: yup.string().required(),
    address: yup.string().required(),
    email: yup.string().required(),
    category: yup.string().required(),
  });
  const [image, setImage] = React.useState(null);

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
  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = async (formDataValues) => {
    try {
      let imageUrl;
      if (image) {
        const imageApi = `${BASE_URL}/api/upload-image`;
        const formData = new FormData();
        formData.append("Image", image);

        const imageResponse = await axios.post(imageApi, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        console.log("imageResponse", imageResponse);
        imageUrl = imageResponse.data.url;
      }
      const objToSend = {
        ...formDataValues,
        imageUrl: imageUrl || null,
      };
      const response = await axios.post(
        `${BASE_URL}/api/create-restaurant`,
        objToSend,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")} `,
          },
        }
      );

      handleClose();
      reset({});

      toaster({
        message: "Restaurant Created Successfully",
        type: "success",
      });
      setIsRefresh(!isRefresh);
    } catch (error) {
      toaster({ message: error.message, type: "error" });
    }
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
              color="warning"
              sx={{ textDecoration: "underline" }}
            >
              Register Your Restaurant
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
                  error={error}
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
                  error={error}
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

            <Button variant="outlined" component="label">
              Upload Logo
              <input
                type="file"
                accept="image/*"
                hidden
                name="logo"
                onChange={handleChange}
              />
            </Button>

            {image && (
              <Typography variant="body2" color="text.secondary">
                Selected file: {image.name}
              </Typography>
            )}

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
