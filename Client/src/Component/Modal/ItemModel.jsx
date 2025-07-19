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

const categories = ["Fast Food", "Dessert", "Drinks", "Desi", "BBQ"];

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
  setIsRefresh,
  isRefresh,
}) {
  const [image, setImage] = useState(null);
  
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
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
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const onSubmit = async (obj) => {
    try {
      const formData = new FormData();

      formData.append("createFoodItem", JSON.stringify(obj));

      if (image) {
        formData.append("file", image); // 👈 must match backend key (upload.single("image"))
      }

      const res = await axios.post(
        `${BASE_URL}/api/create-restaurant-food`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res, "formDataValues res");
   
      toaster({
        message: "Food item created successfully",
        type: "success",
      });

      handleClose();
      reset();
      setImage(null);
      setIsRefresh(!isRefresh);
    } catch (error) {
      toaster({
        message: error.message || "something went wrong",
        type: "error",
      });
    }

    console.log("Form submitted:", obj);

    reset();
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

          {/* Image Upload */}
          {/* <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setValue("image", e.target.files)}
                />
                {errors.image && (
                  <Typography color="error" variant="body2">
                    {errors.image.message}
                  </Typography>
                )}
              </>
            )}
          /> */}

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

          {/* Image Preview */}
          {/* {imageFile && imageFile.length > 0 && (
            <img
              src={URL.createObjectURL(imageFile[0])}
              alt="Preview"
              style={{ width: "100px", height: "auto", borderRadius: "8px" }}
            />
          )} */}

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
