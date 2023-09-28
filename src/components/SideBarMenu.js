import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Typography from "@mui/material/Typography";

export default function DesktopSidebar({ setCurrentPage }) {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index, page) => {
    setSelectedIndex(index);
    setCurrentPage(page);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 250,
        bgcolor: 'transparent',
        display: { xs: 'none', md: 'block' }
      }}>
      <Typography variant="h6" align="center" style={{ margin: "10px 0" }}>
        Gestion.AR
      </Typography>
      <List component="nav" aria-label="main mailbox folders">
        <ListItemButton
          selected={selectedIndex === 0}
          onClick={(event) => handleListItemClick(event, 0, "Home")}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton
          selected={selectedIndex === 1}
          onClick={(event) => handleListItemClick(event, 1, "Favoritos")}>
          <ListItemIcon>
            <FavoriteIcon />
          </ListItemIcon>
          <ListItemText primary="Favoritos" />
        </ListItemButton>
      </List>
    </Box>
  );
}
