import React, { useState } from "react";
import { List, ListItem, Link, ListItemText, Select, MenuItem, FormControl, InputLabel, Box } from "@mui/material";

const FavoritesComponent = ({ favorites = [], categories = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState(''); // correcto

  const filteredFavorites = !selectedCategory || selectedCategory === ""
    ? favorites
    : favorites?.filter(fav => fav.category === selectedCategory);

  return (
    <Box sx={{ 
      maxWidth: {
        xs: '400px', 
        sm: '500px', 
        md: '600px',
        lg: '700px',
      },
      margin: 'auto',
    }}>
      <h2 style={{ marginLeft: '2px' }}>Favoritos</h2>
      
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
          label={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}>
          <MenuItem value="" style={{ color: "black" }}>
            <em>Todos</em>
          </MenuItem>
          {categories?.map((category, index) => (
            <MenuItem key={index} value={category} style={{ color: "black" }}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <List sx={{ maxHeight: '60vh', overflow: 'auto' }}>
        {filteredFavorites?.map((favorite, index) => (
          <ListItem key={index}>
            <Link href={favorite.url} target="_blank" rel="noopener noreferrer">
              <ListItemText 
                primary={favorite.username} 
                secondary={favorite.category}
                primaryTypographyProps={{
                  style: { 
                    fontWeight: 'bold', 
                    fontSize: '1.3rem',
                    color: 'white'
                  }
                }}
                secondaryTypographyProps={{
                  style: { 
                    color: 'wheat'
                  }
                }} 
              />
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FavoritesComponent;
