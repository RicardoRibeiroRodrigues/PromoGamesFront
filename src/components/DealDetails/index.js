import { Container, Paper, Typography, Button, Rating } from "@mui/material";
import React from "react";
import { useLocation } from 'react-router-dom';
import SiteAppBar from "../SiteAppBar";




export default function DealDetails(props) {
    const location = useLocation();
    const details = location.state.details;
    const dealID = location.state.dealID;
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

    const goToDeal = () => {
        window.location.href = `https://www.cheapshark.com/redirect?dealID=${dealID}`;
    }
    const goToCritic = () => {
        window.location.href = `https://www.metacritic.com/${gameInfo.metacriticLink}`;
    }
    const metacriticScoreValue = parseFloat(gameInfo.metacriticScore) / 10;
    return (
        <>
            <SiteAppBar />
            <Container sx={{ width: '100%', ...flexCenter }}>
                <Paper sx={{ width: '80%', height: "50%", ...flexCenter, margin: "1rem 0rem 0rem 0rem", paddingBottom: '1rem' }}>
                    <Typography variant='h3' sx={{ textAlign: 'center' }}>{details.gameInfo.name}</Typography>
                    {gameInfo.steamRatingText &&
                        <Typography variant="h5">
                            Avaliações na steam:
                            <span style={{ color: color, fontWeight: 'bold' }}>
                                {' ' + reviewText}
                            </span>
                        </Typography>}
                    {cheaperStores.map((store) => (
                        <Typography key={`store__${store.storeID}`}>{store.storeID}</Typography>))}
                    <img src={gameInfo.thumb} alt='img thumb'></img>
                    {gameInfo.metacriticScore !== '0' ?
                        <div className='margin-top' style={{
                            border: '1px solid black', borderRadius: '10px',
                            padding: '0.5rem', cursor: 'pointer'
                        }} onClick={() => goToCritic()}>
                            <div style={{ display: 'flex' }}>
                                <img style={{ marginRight: '0.5rem', height: 25 }} src='metacriticLogo.png'
                                    alt='logo metacritic'></img>
                                <Typography >
                                    Metacritic score:
                                </Typography>
                            </div>
                            <Rating name="customized-10" defaultValue={0} value={metacriticScoreValue}
                                max={10} precision={0.5} readOnly />
                        </div>
                        : <></>}
                    <Button sx={{ margin: '1rem 0rem 1rem 0rem' }} variant="outlined" onClick={() => goToDeal()}>
                        Ir para oferta
                    </Button>
                </Paper>
            </Container>
        </>
    );
}