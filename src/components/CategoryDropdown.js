import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const CategoryDropdown = ({ categories, setSelectedCategory }) => { 
    return (
        <FormControl fullWidth variant="outlined">
        <InputLabel>Todos</InputLabel>
        <Select
          label="Todos"
          onChange={(e) => setSelectedCategory(e.target.value || [])}
        >
          <MenuItem value="">
            <em>Todos</em>
          </MenuItem>
          {categories.map((category, index) => (
            <MenuItem key={index} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
};

export default CategoryDropdown;
