import { Container, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation } from 'react-router-dom';




export default function DealDetails(props) {
    // const details = props.location.state.details;
    const location = useLocation();
    const details = location.state.details;
    console.log(details);

    return (
        <Container sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
            <Paper sx={{ width: '80%' }}>
                <Typography variant='h4'>{details.gameInfo.name}</Typography>
                {details.gameInfo.steamRatingText && <Typography>{details.gameInfo.steamRatingText}</Typography>}
                {details.cheaperStores.map((store) => <Typography>{store}</Typography>)}
            </Paper>
        </Container>
    );
}