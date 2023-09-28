import React, { useState, useEffect } from "react";
import { Grid, useMediaQuery, Box } from "@mui/material";
import SideBarMenu from "./components/SideBarMenu";
import BottomNavigation from "./components/BottomNavigation";
import Home from "./components/Home";
import FavoritesPage from "./components/FavoritesPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const openDatabase = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("myDatabase", 1);

    request.onerror = function (event) {
      reject("No se pudo abrir la base de datos");
    };

    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      db.createObjectStore("favorites", { keyPath: "username" });
      db.createObjectStore("categories", { autoIncrement: true });
    };

    request.onsuccess = function (event) {
      resolve(event.target.result);
    };
  });
};

export const saveFavorite = async (favorite) => {
  const db = await openDatabase();
  const transaction = db.transaction(["favorites"], "readwrite");
  const objectStore = transaction.objectStore("favorites");
  const request = objectStore.add(favorite);

  return new Promise((resolve, reject) => {
    transaction.oncomplete = function (event) {
      resolve();
    };

    transaction.onerror = function (event) {
      reject("Error al guardar el favorito");
    };
  });
};

const getAllFavorites = async () => {
  const db = await openDatabase();
  const transaction = db.transaction(["favorites"], "readonly");
  const objectStore = transaction.objectStore("favorites");
  const request = objectStore.getAll();

  return new Promise((resolve, reject) => {
    request.onerror = function (event) {
      reject("Error al obtener los favoritos");
    };

    request.onsuccess = function (event) {
      resolve(request.result);
    };
  });
};

export const saveCategory = async (category) => {
  const db = await openDatabase();
  const transaction = db.transaction(["categories"], "readwrite");
  const objectStore = transaction.objectStore("categories");
  const request = objectStore.add(category);

  return new Promise((resolve, reject) => {
    transaction.oncomplete = function (event) {
      resolve();
    };

    transaction.onerror = function (event) {
      reject("Error al guardar la categoría");
    };
  });
};

const getAllCategories = async () => {
  const db = await openDatabase();
  const transaction = db.transaction(["categories"], "readonly");
  const objectStore = transaction.objectStore("categories");
  const request = objectStore.getAll();

  return new Promise((resolve, reject) => {
    request.onerror = function (event) {
      reject("Error al obtener las categorías");
    };

    request.onsuccess = function (event) {
      resolve(request.result);
    };
  });
};

function App() {
  const [favorites, setFavorites] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState("Home");

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const allFavorites = await getAllFavorites();
        setFavorites(allFavorites);
        
        // Cargar categorías desde IndexedDB
        const allCategories = await getAllCategories();
        setCategories(allCategories);
  
      } catch (error) {
        console.error("Error al cargar los datos", error);
      }
    };
  
    loadFavorites();
  }, []);

  const theme = createTheme({
    palette: {
      text: {
        primary: "#fff",
      },
      primary: {
        main: "#fff", // Blanco para los elementos primarios como botones y textos seleccionados
      },
    },
    overrides: {
      MuiInput: {
        input: {
          color: "#fff",
        },
        underline: {
          "&:before": {
            borderBottom: "1px solid #fff",
          },
          "&:hover:not(.Mui-disabled):before": {
            borderBottom: "1px solid #fff",
          },
          "&:after": {
            borderBottom: "2px solid #fff",
          },
        },
      },
      MuiBottomNavigationAction: {
        root: {
          color: "#fff",
        },
      },
    },
  });

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

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
    height: "100vh",
    width: "100%",
  };

  return (
    <ThemeProvider theme={theme}>
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
          {isSmallScreen && (
            <BottomNavigation setCurrentPage={setCurrentPage} />
          )}
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default App;
