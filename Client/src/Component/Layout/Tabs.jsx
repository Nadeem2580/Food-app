import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import axios from "axios";
import { Button, Grid } from "@mui/material";
import FoodEditModal from "../Modal/FoodEdit";
import FoodCard from "../allCard/FoodCard";
import { useAppContext } from "../../Context/userContext";
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function RestaurantTabs({ dataFood }) {
  const [value, setValue] = React.useState(0);
  const [foodopen, setFoodopen] = React.useState(false);
  const [selected, setSelected] = React.useState(null);
  const {isRefresh , setIsRefresh}=useAppContext()
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Group foods by category
  const categories = [...new Set(dataFood.map((item) => item.category))];
  const groupedData = categories.map((cat) =>
    dataFood.filter((item) => item.category === cat)
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="restaurant tabs"
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          {categories.map((cat, index) => (
            <Tab key={index} label={cat} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>

      {groupedData?.map((foodArray, index) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {foodArray.length > 0 ? (
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {foodArray.map((item) => (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item._id}>
                    <FoodCard
                      food={item}
                      setOpen={setFoodopen}
                      setSelected={setSelected}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
            <Typography>No items found in this category.</Typography>
          )}
        </CustomTabPanel>
      ))}

      <FoodEditModal
        open={foodopen}
        setOpen={setFoodopen}
        setIsRefresh={setIsRefresh}
        selected={selected}
      />
    </Box>
  );
}
