import React from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const CategoryDropdown = ({ categories, setSelectedCategory }) => {
  return (
    <FormControl
      fullWidth
      variant="outlined"
      sx={{
        "& fieldset": {
          borderColor: "white",
        },
        "& .MuiSelect-icon": {
          color: "white",
        },
      }}>
      <InputLabel sx={{ color: "white" }}>Todos</InputLabel>
      <Select
        label="Todos"
        onChange={(e) => setSelectedCategory(e.target.value || [])}>
        <MenuItem value="" style={{ color: "black" }}>
          <em>Todos</em>
        </MenuItem>
        {categories.map((category, index) => (
          <MenuItem key={index} value={category} style={{ color: "black" }}>
            {category}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategoryDropdown;
