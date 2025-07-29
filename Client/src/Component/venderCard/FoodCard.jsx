import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { BASE_URL, toaster } from "../../Utils/Utility";
import axios from "axios";
import Cookies from "js-cookie";




const FoodCard = ({ food, setIsRefresh, isRefresh , setOpen ,setSelected}) => {
  const { name, price, description, category, isavailable, imageUrl } = food;
  const deleteHandler = async (id) => {
    try {
      await axios.delete(
        `${BASE_URL}/api/vendor-restaurant-food-delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")} `,
          },
        }
      );
      toaster({ message: "Restaurant deleted", type: "success" });
      setIsRefresh(!isRefresh);
    } catch (err) {
      toaster({ message: err.message, type: "error" });
    }
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: 4,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 6,
        },
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardMedia
        component="img"
        height="180"
        image={imageUrl}
        alt={name}
        sx={{ objectFit: "cover" }}
      />

      <CardContent sx={{ p: 2 }}>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {name}
        </Typography>

        <Typography variant="body2" color="text.secondary" gutterBottom>
          {description?.length > 60
            ? description?.slice(0, 60) + "..."
            : description}
        </Typography>

        <Typography variant="body2" sx={{ mt: 1 }}>
          <strong>Category:</strong> {category}
        </Typography>

        <Typography variant="body2">
          <strong>Price:</strong> Rs. {price}
        </Typography>

        <Chip
          label={isavailable ? "Available" : "Unavailable"}
          color={isavailable ? "success" : "error"}
          size="small"
          sx={{ mt: 1 }}
        />

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Tooltip title="Edit">
            <IconButton color="primary" size="small">
              <EditIcon  onClick={()=>{
                 setSelected(food);
                setOpen(true);
              }}/>
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton color="error" size="small">
              <DeleteIcon onClick={() => deleteHandler(food._id)} />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FoodCard;
