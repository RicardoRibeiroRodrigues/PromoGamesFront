import React from "react";
import "./index.css";
import { Box, Toolbar, Typography, AppBar } from '@mui/material';
import { useNavigate, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar";

export default function SiteAppBar(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const sendToHome = () => {
    navigate("/");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" >
        <Toolbar>
          <img src='PromoGames.png' alt="logo" height={50} className="margin-right-1 cursor-pointer"
            onClick={() => sendToHome()}></img>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: '1rem' }}>
            Os melhores jogos em promoção.
          </Typography>
          {location.pathname === '/' &&
            <SearchBar filters={props.filters} setFilters={props.setFilters}></SearchBar>}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
