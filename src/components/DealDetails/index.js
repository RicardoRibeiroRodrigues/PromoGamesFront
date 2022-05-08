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

    const formatSteamRating = (rating) => {
        if (rating === 'Overwhelmingly Positive')
            return ['green', 'Extremamente positivas'];
        else if (rating === "Very Positive")
            return ['green', 'Muito positivas'];
        else if (rating === 'Positive')
            return ['lightgreen', 'Positivas'];
        else if (rating === 'Mostly Positive')
            return ['lightgreen', 'Ligeramente Positivas'];
        else if (rating === 'Mixed')
            return ['white', 'Neutras'];
        else if (rating === 'Mostly Negative')
            return ['lightred', 'Ligeramente Negativas'];
        else if (rating === 'Negative')
            return ['lightred', 'Negativas'];
        else if (rating === 'Very Negative')
            return ['red', 'Muito negativas'];
        else
            return ['red', 'Extremamente negativas'];
    }

    let [color, reviewText] = ('', '');
    if (gameInfo.steamRatingText)
        [color, reviewText] = formatSteamRating(gameInfo.steamRatingText);

    return (
        <>
            <SiteAppBar />
            <Container sx={{ width: '100%', ...flexCenter }}>
                <Paper sx={{ width: '80%', height: "50%", ...flexCenter, margin: "1rem 0rem 0rem 0rem", paddingBottom: '1rem' }}>
                    <Typography variant='h3' sx={{ textAlign: 'center' }}>{details.gameInfo.name}</Typography>
                    {gameInfo.steamRatingText &&
                        <Typography variant="h5">
                            Avaliações na steam: <span style={{ color: color, fontWeight: 'bold' }}>{reviewText}</span>
                        </Typography>}
                    {/* Fazer essa parte !!! */}
                    {cheaperStores.map((store) => <Typography key={`Store: ${store.storeID}`}>{store.storeID}</Typography>)}
                    <img src={gameInfo.thumb} ></img>
                </Paper>
            </Container>
        </>
    );
}