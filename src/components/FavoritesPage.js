import React, { useState } from 'react'; 
import CategoryDropdown from './CategoryDropdown';
import FavoritesList from './FavoritesList';
import { Box } from '@mui/material';

const FavoritesPage = ({ favorites, categories }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

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
      <CategoryDropdown categories={categories} setSelectedCategory={setSelectedCategory} />
      <FavoritesList favorites={favorites} selectedCategory={selectedCategory} />
    </Box>
  );
};

export default FavoritesPage;
