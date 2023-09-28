import React from 'react';
import { List, ListItem, Link, ListItemText } from '@mui/material';

const FavoritesList = ({ favorites, selectedCategory }) => {
  const filteredFavorites = selectedCategory
    ? favorites.filter(fav => fav.category === selectedCategory)
    : favorites;

  return (
    <List sx={{ maxHeight: '60vh', overflow: 'auto' }}>
      {filteredFavorites.map((favorite, index) => (
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
  );
};

export default FavoritesList;
