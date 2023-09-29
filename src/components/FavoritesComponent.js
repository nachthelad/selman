import React, { useState } from "react";
import {
  List,
  ListItem,
  Link,
  ListItemText,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { deleteFavorite, deleteCategory } from "./dbOperations";

const FavoritesComponent = ({
  favorites = [],
  categories = [],
  setFavorites = () => {},
  setCategories = () => {},
}) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const filteredFavorites =
    !selectedCategory || selectedCategory === "Todos"
      ? favorites
      : favorites?.filter((fav) => fav.category === selectedCategory);

  const handleDelete = async (favorite) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await deleteFavorite(favorite.username);
    
        // Calculamos el nuevo estado de los favoritos.
        const updatedFavorites = favorites.filter((fav) => fav.username !== favorite.username);
        
        // Calculamos si debemos eliminar la categoría.
        const remainingFavoritesInCategory = updatedFavorites.filter((fav) => fav.category === favorite.category);
        let newCategories = categories;
        if (remainingFavoritesInCategory.length === 0) {
          await deleteCategory(favorite.category); // Aquí eliminamos la categoría de la base de datos
          newCategories = categories.filter((cat) => cat.categoryName !== favorite.category);
        }
    
        // Actualizamos los estados.
        setFavorites(updatedFavorites); // Asegúrate de que esto realmente actualiza el estado
        setCategories(newCategories);  // Asegúrate de que esto realmente actualiza el estado
    
        Swal.fire("Eliminado!", "El favorito ha sido eliminado.", "success");
      } catch (error) {
        console.log("Error detallado:", error);
        Swal.fire("Error!", "Hubo un error al eliminar el favorito.", "error");
      }
    }
  };

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
      <h2 style={{ marginLeft: "2px" }}>Favoritos</h2>

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
        <InputLabel sx={{ color: "white" }}>Seleccionar</InputLabel>
        <Select
          label={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ width: '140px' }}>
          <MenuItem value="Todos" sx={{ color: "black" }}>
            <em>Todos</em>
          </MenuItem>
          {categories?.map((category, index) => (
            <MenuItem key={index} value={category.categoryName} style={{ color: "black" }}>
              {category.categoryName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <List sx={{ maxHeight: "60vh", overflow: "auto" }}>
        {filteredFavorites?.map((favorite, index) => (
          <ListItem key={index}>
            <Link href={favorite.url} target="_blank" rel="noopener noreferrer">
              <ListItemText
                primary={favorite.username}
                secondary={favorite.category}
                primaryTypographyProps={{
                  style: {
                    fontWeight: "bold",
                    fontSize: "1.3rem",
                    color: "white",
                  },
                }}
                secondaryTypographyProps={{
                  style: {
                    color: "wheat",
                  },
                }}
              />
            </Link>
            <IconButton
              edge="end"
              aria-label="delete"
              sx={{ color: "white" }}
              onClick={() => handleDelete(favorite)}>
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default FavoritesComponent;
