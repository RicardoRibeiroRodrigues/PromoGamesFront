import React from "react";
import "./index.css";
import { Box, Toolbar, Typography, AppBar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function SiteAppBar(props) {
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
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Os melhores jogos em promoção.
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
