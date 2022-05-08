import { Container, Paper, Typography } from "@mui/material";
import React from "react";
import { useLocation } from 'react-router-dom';
import SiteAppBar from "../SiteAppBar";




export default function DealDetails(props) {
    // const details = props.location.state.details;
    const location = useLocation();
    const details = location.state.details;
    console.log(details);
    const { gameInfo, cheaperStores } = details;
    const flexCenter = {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    };

    return (
        <>
            <SiteAppBar />
            <Container sx={{ width: '100%', ...flexCenter }}>
                <Paper sx={{ width: '80%', height: "50%", ...flexCenter, margin: "1rem 0rem 0rem 0rem" }}>
                    <Typography variant='h3' sx={{ textAlign: 'center' }}>{details.gameInfo.name}</Typography>
                    {gameInfo.steamRatingText && <Typography>{details.gameInfo.steamRatingText}</Typography>}
                    {cheaperStores.map((store) => <Typography>{store}</Typography>)}
                    <img src={gameInfo.thumb} ></img>
                </Paper>
            </Container>
        </>
    );
}