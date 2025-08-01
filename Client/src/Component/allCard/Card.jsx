import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PhoneIcon from "@mui/icons-material/Phone";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import PlaceIcon from '@mui/icons-material/Place';
import {
  Box,
  Button,
  Card,
  Chip,
  Stack,
  Typography
} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import { BASE_URL, toaster } from "../../Utils/Utility";
import { useAppContext } from "../../Context/userContext";

export default function RestaurantCard({
  restaurant,
  setOpenModel,
  setSelectRestaurant,
  setFooditemModel
}) {
  const {
    restaurantName,
    details,
    contactNumber,
    address,
    email,
    category,
    isOpen,
    imageUrl,
    approvedStatus,
  } = restaurant || {};

  const { isRefresh, setIsRefresh } = useAppContext()

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/vendor-restaurant/${id}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")} `,
        },
      });
      toaster({ message: "Restaurant deleted", type: "success" });
      setIsRefresh(!isRefresh);
    } catch (err) {
      toaster({ message: err.message, type: "error" });
    }
  };

  const isOpenStatus = async () => {
    try {
      const id = restaurant._id;
      const updateObj = {
        isOpen: !isOpen,
      };
      const response = await axios.patch(
        `${BASE_URL}/api/vendor-restaurant-isOpen-status/${id}`,
        updateObj,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      if (!response.data.status) {
        return toaster({ message: response.data.message, type: "error" });
      }
      setIsRefresh(!isRefresh);

      toaster({ message: "Restaurant Status Update", type: "success" });
      setIsRefresh(!isRefresh);
    } catch (error) {
      toaster({ message: error.message, type: "error" });
    }
  };

  return (
    <>
      <Card
        sx={{
          width: "100%",
          borderRadius: 4,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          mt: 4,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          overflow: "hidden",
          transition: "all 0.3s ease",
          backgroundColor: "#f8f5f2",
          borderLeft: "5px solid #95ca4d",
          '&:hover': {
            transform: "translateY(-5px)",
            boxShadow: "0 8px 24px rgba(149, 202, 77, 0.2)",
          },
        }}
      >
        {/* Image Section with Status Badge */}
        <Box sx={{ position: "relative" }}>
          <Box
            component="img"
            src={imageUrl}
            alt={restaurantName}
            sx={{
              width: { xs: "100%", sm: 280 },
              height: { xs: 220, sm: 250 },
              objectFit: "cover",
            }}
          />

        </Box>

        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            p: 3,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Restaurant Name */}
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{
              color: "#333",
              mb: 1,
              display: "flex",
              alignItems: "center",
              gap: 1
            }}
          >
            <RestaurantIcon sx={{ color: "#95ca4d" }} />
            {restaurantName}
            <Chip
              onClick={isOpenStatus}
              label={isOpen ? "OPEN NOW" : "CLOSED"}
              sx={{
                marginLeft: "auto",
                backgroundColor: isOpen ? "#95ca4d" : "#ff6b6b",
                color: "white",
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            />
          </Typography>

          {/* Category and Approval Status */}
          <Box sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}>
            <Chip
              label={category}
              sx={{
                backgroundColor: "#e8f5e9",
                color: "#2e7d32",
                fontWeight: 600
              }}
            />
            <Chip
              label={approvedStatus.toUpperCase()}
              sx={{
                backgroundColor:
                  approvedStatus === "approved" ? "#e8f5e9" :
                    approvedStatus === "rejected" ? "#ffebee" : "#fff8e1",
                color:
                  approvedStatus === "approved" ? "#2e7d32" :
                    approvedStatus === "rejected" ? "#c62828" : "#f57f17",
                fontWeight: 600
              }}
              icon={
                approvedStatus === "approved" ? (
                  <CheckCircleIcon fontSize="small" />
                ) : (
                  <CancelIcon fontSize="small" />
                )
              }
            />
          </Box>

          {/* Contact Info */}
          <Box sx={{ mb: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
              <PlaceIcon fontSize="small" sx={{ color: "#95ca4d" }} />
              <Typography variant="body2" color="text.secondary">
                {address}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <PhoneIcon fontSize="small" sx={{ color: "#95ca4d" }} />
              <Typography variant="body2" color="text.secondary">
                {contactNumber}
              </Typography>
            </Stack>
          </Box>

          {/* Details */}
          <Typography
            variant="body2"
            sx={{
              color: "#555",
              mb: 2,
              flexGrow: 1,
              fontStyle: details ? "normal" : "italic"
            }}
          >
            {details || "No description available"}
          </Typography>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<EditIcon sx={{ fontSize: 10 }} />}
              onClick={() => {
                setSelectRestaurant(restaurant);
                setOpenModel(true);
              }}
              sx={{
                fontSize: "10px",
                backgroundColor: "#95ca4d",
                color: "white",
                '&:hover': {
                  backgroundColor: "#7fb33d",
                },
              }}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => deleteHandler(restaurant._id)}
              sx={{
                borderColor: "#ff6b6b",
                color: "#ff6b6b",
                '&:hover': {
                  backgroundColor: "rgba(255, 107, 107, 0.08)",
                  borderColor: "#ff6b6b",
                },
              }}
            >
              Delete
            </Button>

            <Button
              variant="contained"
              sx={{ float: "right" }}
              onClick={() => setFooditemModel(true)}
            >
              Create food item
            </Button>
          </Box>
        </Box>
      </Card>





    </>
  );
}
