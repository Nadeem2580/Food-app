import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL, toaster } from "../../Utils/Utility";
import { useAppContext } from "../../Context/userContext";



const FoodCard = ({ food, setOpen, setSelected }) => {
  const { name, price, description, category, isavailable, imageUrl } = food;
  const { isRefresh, setIsRefresh } = useAppContext()
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
      toaster({ message: "Food item deleted", type: "success" });
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
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f8f5f2",
        borderTop: "3px solid #95ca4d",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0 8px 24px rgba(149, 202, 77, 0.2)",
        },
      }}
    >
      {/* Image with availability badge */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="180"
          image={imageUrl}
          alt={name}
          sx={{
            objectFit: "cover",
            filter: isavailable ? "none" : "grayscale(50%) brightness(0.9)",
          }}
        />
        <Chip
          label={isavailable ? "Available" : "Sold Out"}
          size="small"
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            backgroundColor: isavailable ? "#95ca4d" : "#ff6b6b",
            color: "white",
            fontWeight: "bold",
            fontSize: "0.7rem",
            textTransform: "uppercase",
          }}
        />
      </Box>

      {/* Content */}
      <CardContent sx={{ p: 2.5, flexGrow: 1, display: "flex", flexDirection: "column" }}>
        {/* Name and Price */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Typography
            variant="h6"
            fontWeight="700"
            sx={{
              color: "#333",
              lineHeight: 1.2
            }}
          >
            {name}
          </Typography>
          <Typography
            variant="h6"
            fontWeight="700"
            sx={{
              color: "#95ca4d",
              whiteSpace: "nowrap"
            }}
          >
            Rs. {price}
          </Typography>
        </Box>

        {/* Description */}
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 1.5,
            flexGrow: 1,
            fontStyle: !description ? "italic" : "normal"
          }}
        >
          {description?.length > 80
            ? `${description.slice(0, 80)}...`
            : description || "No description available"}
        </Typography>


        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 1,
            mt: "auto"
          }}
        >
          <Tooltip title="Edit">
            <IconButton
              size="small"
              sx={{
                backgroundColor: "rgba(66, 165, 245, 0.1)",
                '&:hover': {
                  backgroundColor: "rgba(66, 165, 245, 0.2)",
                }
              }}
              onClick={() => {
                setSelected(food);
                setOpen(true);
              }}
            >
              <EditIcon fontSize="small" sx={{ color: "#42a5f5" }} />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton
              size="small"
              sx={{
                backgroundColor: "rgba(239, 83, 80, 0.1)",
                '&:hover': {
                  backgroundColor: "rgba(239, 83, 80, 0.2)",
                }
              }}
              onClick={() => deleteHandler(food._id)}
            >
              <DeleteIcon fontSize="small" sx={{ color: "#ef5350" }} />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FoodCard;
