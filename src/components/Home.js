import React from "react";
import InputForm from "./InputForm";
import { Box } from "@mui/material";

const Home = ({ setFavorites, setCategories, categories }) => {
  return (
    <Box sx={{ 
      maxWidth: {
        xs: '400px', // para pantallas pequeñas
        sm: '500px', // para pantallas medianas
        md: '600px', // para pantallas grandes
        lg: '700px', // para pantallas aún más grandes
      },
      margin: 'auto'
    }}>
      <h3 style={{ marginLeft: '16px' }}>Escribe la URL de tu cuenta de Instagram favorita y luego una categoría</h3>
      <InputForm setFavorites={setFavorites} setCategories={setCategories} categories={categories} />
    </Box>
  );
};

export default Home;
