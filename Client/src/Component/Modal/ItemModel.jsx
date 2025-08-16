import * as React from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  MenuItem,
  TextField,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { BASE_URL, toaster } from "../../Utils/Utility";
import axios from "axios";
import Cookies from "js-cookie";
import { useAppContext } from "../../Context/userContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};

const categories = ["Biryani", "Fast Food", "Chiness"];

const schema = yup.object().shape({
  name: yup.string().required("Food name is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .positive()
    .required("Price is required"),
  description: yup.string().required("Description is required"),
  category: yup.string().required("Category is required"),
});

export default function FoodItemModal({
  open,
  setOpen,
  data
}) {
  const [image, setImage] = useState(null);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      description: "",
      category: "",
      // file: null,
      available: true,
    },
    resolver: yupResolver(schema),
  });
  const handleClose = () => setOpen(false);
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };
  const { navigate, isRefresh, setIsRefresh } = useAppContext()
  const onSubmit = async (obj) => {
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
        imageUrl = imageResponse.data.url;
      }

      const sendObj = {
        ...obj,
        imageUrl: imageUrl || null,
        restaurantId: data._id,
      };
      const response = await axios.post(
        `${BASE_URL}/api/create-restaurant-food`,
        sendObj,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
console.log(response , "food item created")
      handleClose();
      reset();
      setImage(null);
      setIsRefresh(!isRefresh);
      navigate("/vendor-Menu")
      toaster({
        message: "Food item created successfully",
        type: "success",
      });
    } catch (error) {
      toaster({
        message: error.message || "something went wrong",
        type: "error",
      });
    }
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <Typography variant="h6" align="center" gutterBottom>
          Add Food Item
        </Typography>

        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {/* Food Name */}
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                label="Food Name"
                fullWidth
                {...field}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />

          {/* Price */}
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <TextField
                label="Price (in Rs)"
                fullWidth
                {...field}
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            )}
          />

          {/* Description */}
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                label="Description"
                multiline
                rows={3}
                fullWidth
                {...field}
                error={!!errors.description}
                helperText={errors.description?.message}
              />
            )}
          />

          {/* Category */}
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <TextField
                label="Category"
                select
                fullWidth
                {...field}
                error={!!errors.category}
                helperText={errors.category?.message}
              >
                {categories.map((cat, idx) => (
                  <MenuItem key={idx} value={cat}>
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
              onChange={imageHandler}
            />
          </Button>

          {image && (
            <Typography variant="body2"> Selected :{image.name}</Typography>
          )}

          {/* Availability Toggle */}
          <Controller
            name="available"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Switch {...field} checked={field.value} />}
                label="Available"
              />
            )}
          />

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
