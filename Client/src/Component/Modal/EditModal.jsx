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
import { useAppContext } from "../../Context/userContext";


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

const categories = ["Biryani", "Fast Food", "Chiness"];

export default function EditModel({
  open,
  setOpen,
  selectRestaurant,
}) {
  // --------------- schema Model -----------
  const schema = yup.object({
    restaurantName: yup.string().required(),
    details: yup.string().required(),
    contactNumber: yup.string().required(),
    address: yup.string().required(),
    email: yup.string().required(),
    category: yup.string().required(),
  });

  const {isRefresh ,setIsRefresh}= useAppContext()
  // --------------- Default Values and UseForm initialization -----------

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

  // --------------- Modal is closing here --------------------
  const handleClose = () => setOpen(false);

  // ------------- Onsubmit funstion is running here ------------------

  const onSubmit = async (obj) => {
    const updateObj = {
      address: obj.address,
      category: obj.category,
      contactNumber: obj.contactNumber,
      details: obj.details,
      email: obj.email,
      restaurantName: obj.restaurantName,
    };
    try {
      const updateRes = await axios.put(`${BASE_URL}/api/vendor-restaurant/${obj._id}`,updateObj,{
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      toaster({
        message: "Restaurant Updated",
        type: "success",
      });
      handleClose();
      reset();
      setIsRefresh(!isRefresh);
    } catch (error) {
      toaster({ message: error.message, type: "error" });
    }
  };

  React.useEffect(() => {
    reset(selectRestaurant);
  }, []);

  //  --------------------- Modal HTML COde ----------------

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
              Update Your Restaurant
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
              Update
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}
