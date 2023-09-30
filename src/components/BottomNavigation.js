import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useMediaQuery } from "@mui/material";
import Swal from "sweetalert2";

export default function MyBottomNavigation({ setCurrentPage }) {
  const matches = useMediaQuery("(max-width:900px)");
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      setCurrentPage("Home");
    } else if (newValue === 1) {
      setCurrentPage("Favoritos");
    }
  };

  if (!matches) {
    return null;
  }

  return (
    <Box
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        zIndex: 1000,
      }}
    >
      <BottomNavigation showLabels value={value} onChange={handleChange}>
        <BottomNavigationAction
          label="Home"
          sx={{
            "&.Mui-selected": {
              color: "black",
            },
          }}
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label="Favoritos"
          sx={{
            "&.Mui-selected": {
              color: "black",
            },
          }}
          icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
          label="Usuario"
          sx={{
            "&.Mui-selected": {
              color: "black",
            },
          }}
          icon={<AccountCircleIcon />}
          onClick={() => {
            Swal.fire({
              title: "En progreso!",
              text: "Estamos trabajando para traer el inicio de sesión a la app.",
              icon: "info",
            });
          }}
        />
      </BottomNavigation>
    </Box>
  );
}
