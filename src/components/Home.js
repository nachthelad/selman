import React from "react";
import InputForm from "./InputForm";
import { Box } from "@mui/material";

const Home = ({ setFavorites, setCategories, categories, favorites }) => {
  return (
    <Box sx={{ 
      maxWidth: {
        xs: '400px', 
        sm: '500px', 
        md: '600px', 
        lg: '700px', 
      },
      margin: 'auto'
    }}>
      <h3 style={{ marginLeft: '16px' }}>Escribe la URL de tu cuenta de Instagram favorita y luego una categoría</h3>
      <InputForm setFavorites={setFavorites} favorites={favorites} setCategories={setCategories} categories={categories} />
    </Box>
  );
};

export default Home;
