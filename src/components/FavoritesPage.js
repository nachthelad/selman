import React from "react";
import FavoritesComponent from "./FavoritesComponent";
import { Box } from "@mui/material";

const FavoritesPage = ({ favorites, categories, setFavorites, setCategories }) => {
  return (
    <Box
      sx={{
        maxWidth: {
          xs: "400px",
          sm: "500px",
          md: "600px",
          lg: "700px",
        },
        margin: "auto",
      }}>
      <FavoritesComponent
        favorites={favorites}
        categories={categories}
        setFavorites={setFavorites}
        setCategories={setCategories}
      />
    </Box>
  );
};

export default FavoritesPage;
