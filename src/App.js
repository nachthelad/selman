import React, { useState, useEffect } from "react";
import { Grid, useMediaQuery, useTheme, Box } from "@mui/material";
import SideBarMenu from "./components/SideBarMenu";
import BottomNavigation from "./components/BottomNavigation";
import Home from "./components/Home";
import FavoritesPage from "./components/FavoritesPage";

function App() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [favorites, setFavorites] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState("Home");

  // Cargar favoritos desde localStorage cuando se monta el componente
  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Guardar favoritos en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const renderPage = () => {
    if (currentPage === "Home") {
      return (
        <Home
          setFavorites={setFavorites}
          setCategories={setCategories}
          categories={categories}
        />
      );
    } else if (currentPage === "Favoritos") {
      return <FavoritesPage favorites={favorites} categories={categories} />;
    }
  };

  const backgroundStyle = {
    backgroundImage: isSmallScreen
      ? 'url("/images/bg-mobile.svg")'
      : 'url("/images/bg-desktop.svg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: '100vh', 
    width: '100%',  
  };

  return (
    <Box style={backgroundStyle}>
      <div className="App">
        <Grid container>
          {!isSmallScreen && (
            <Grid item xs={2}>
              <SideBarMenu setCurrentPage={setCurrentPage} />
            </Grid>
          )}
          <Grid
            item
            xs={isSmallScreen ? 12 : 8}
            container
            justifyContent="center">
            {renderPage()}
          </Grid>
        </Grid>
        {isSmallScreen && <BottomNavigation setCurrentPage={setCurrentPage} />}
      </div>
    </Box>
  );
}

export default App;
