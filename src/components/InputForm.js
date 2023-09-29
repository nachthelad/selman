import React, { useState } from "react";
import { Container, Grid, TextField, Button } from "@mui/material";
import Swal from "sweetalert2";
import { saveFavorite, saveCategory } from "../components/dbOperations";

const InputForm = ({ setFavorites, favorites, setCategories, categories }) => {
  const [inputValue, setInputValue] = useState("");
  const [category, setCategory] = useState("");

  // Validar que la URL sea una URL de Instagram
  const isValidInstagramURL = (url) => {
    const pattern = new RegExp(
      "^(https://www.)?instagram.com/([a-zA-Z0-9_](?:(?:[a-zA-Z0-9_]|(?:\\.(?=.))){0,28}(?:[a-zA-Z0-9_]))?)/?(\\?.*)?$"
    );
    return pattern.test(url);
  };

  const addFavorite = async () => {
    let username = "";
    let url = "";
  
    // Actualizar el Regex para incluir puntos y guiones bajos
    const pattern = /^@(?:[a-zA-Z0-9_.]){1,30}$/;
    
    if (!category || category.trim() === '') {
      Swal.fire({
        title: "Error!",
        text: "El campo de categoría no puede estar vacío.",
        icon: "error",
      });
      return;
    }

    if (isValidInstagramURL(inputValue)) {
      username = inputValue.split("instagram.com/")[1].replace("/", "");
      url = inputValue;
    } else if (pattern.test(inputValue) || /^[a-zA-Z0-9._-]{1,30}$/.test(inputValue)) {
      username = inputValue.replace("@", "");
      url = `https://www.instagram.com/${username}/`;
    } else {
      Swal.fire({
        title: "Error!",
        text: "Por favor, ingresa una URL válida de Instagram o un nombre de usuario válido.",
        icon: "error",
      });
      return;
    }
  
    // Asumiendo que favorites se pasa como una prop y es un array de objetos
    if (favorites && favorites.some(fav => fav.username === username)) {
      Swal.fire({
        title: "Error!",
        text: "Esta URL o usuario ya ha sido agregado.",
        icon: "error",
      });
      return;
    }

    const newFavorite = {
      username,
      url,
      category,
    };

    const newCategory = {
      categoryName: category,
    };

    try {
      await saveFavorite(newFavorite);

      // Guardar en el estado local
      setFavorites((prevFavorites) => [...prevFavorites, newFavorite]);
  
      // Añadir categoría solo si no existe
      if (!categories.some(cat => cat.categoryName === newCategory.categoryName)) {
        setCategories((prevCategories) => [...prevCategories, newCategory]);
        await saveCategory(newCategory);  // Ahora guardas un objeto, no un string
      }
  
      Swal.fire({
        title: "Agregado con éxito!",
        text: "Tu favorito ha sido agregado.",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "No se pudo guardar tu favorito en la base de datos.",
        icon: "error",
      });

    }
  };

  return (
    <Container style={{ textAlign: "center", paddingTop: "30px" }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="URL de Instagram o Usuario"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            sx={{
              marginBottom: "20px",
              color: "white",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="Categoría"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            sx={{
              marginBottom: "20px",
              color: "white",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={addFavorite}>
            Agregar
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default InputForm;
