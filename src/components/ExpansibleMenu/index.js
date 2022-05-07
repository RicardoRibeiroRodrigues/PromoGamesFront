import { Box, IconButton, Drawer } from "@mui/material";
import React, { useState } from "react";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import "./index.css";

export default function ExpansibleMenu(props) {
  const [menuState, setMenuState] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setMenuState(open);
  };

  return (
    <Box className="center-child" sx={{ height: "100%", bgcolor: "lightgray" }}>
      <IconButton onClick={() => toggleDrawer(true)}>
        {!menuState ? <ArrowRightIcon /> : <ArrowLeftIcon />}
      </IconButton>
      <Drawer
        anchor={"left"}
        open={menuState}
        onClose={() => toggleDrawer(false)}
      >conteudo do drawer</Drawer>
    </Box>
  );
}
