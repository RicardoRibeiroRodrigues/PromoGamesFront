import React from "react";
import "./index.css";
import { Box, Toolbar, Typography, AppBar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from "react-router-dom";

export default function SiteAppBar(props) {
  const navigate = useNavigate();

  const sendToHome = () => {
    navigate("/");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <img src='PromoGames.png' alt="logo" height={50} className="margin-right-1 cursor-pointer" onClick={() => sendToHome()}></img>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Os melhores jogos em promoção.
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
