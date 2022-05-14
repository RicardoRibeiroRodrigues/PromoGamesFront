import { Box, IconButton, Drawer } from "@mui/material";
import React, { useState } from "react";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import "./index.css";
import FiltersList from "../FiltersList";

export default function ExpansibleMenu(props) {
  const [menuState, setMenuState] = useState(false);

  const boxStyle = { position: 'sticky', left: 0, top: 0, height: "100vh", bgcolor: "rgba(0,0,0,0.3)" };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setMenuState(open);
  }

  return (
    <Box className="center-child" sx={boxStyle}>
      <IconButton onClick={toggleDrawer(true)}>
        {!menuState ? <ArrowRightIcon /> : <ArrowLeftIcon />}
      </IconButton>
      <Drawer
        anchor="left"
        open={menuState}
        onClose={toggleDrawer(false)}
        PaperProps={{ sx: { width: '30%' } }}
      >
        <div>
          <FiltersList onlyFavorites={props.onlyFavorites} stores={props.stores}
            setFilters={props.setFilters} setMenuState={setMenuState} />
        </div>
      </Drawer>
    </Box >
  );
}
