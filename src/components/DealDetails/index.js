import { Container, Paper, Typography, Button, Rating } from "@mui/material";
import React from "react";
import { useLocation } from 'react-router-dom';
import SiteAppBar from "../SiteAppBar";
import CheaperStores from "./cheaperStores";



export default function DealDetails(props) {
    const location = useLocation();
    const details = location.state.details;
    const dealID = location.state.dealID;
    const stores = location.state.stores;
    const { gameInfo, cheaperStores } = details;
    console.log(gameInfo);

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
        window.open(`https://www.cheapshark.com/redirect?dealID=${dealID}`, '_blank');
    }
    const goToCritic = () => {
        window.open(`https://www.metacritic.com/${gameInfo.metacriticLink}`, '_blank');
    }
    const metacriticScoreValue = parseFloat(gameInfo.metacriticScore) / 10;


    const SteamRating = () => {

        const steamRatingPercent = parseFloat(gameInfo.steamRatingPercent) / 20;

        if (gameInfo.steamRatingText) {
            return (<Paper sx={{ padding: '0.5rem', width: '70%' }}>
                <Typography variant="h6">
                    Avaliações na steam:
                </Typography>
                <div style={{ display: 'flex', alignItems: 'center', alignContent: 'center' }}>
                    <span style={{ color: color, fontWeight: 'bold' }}>
                        {' ' + reviewText}
                    </span>
                    <Rating name="customized-10" defaultValue={0} value={steamRatingPercent}
                        max={5} precision={0.1} readOnly></Rating>
                </div>
            </Paper>);
        }
    }

    return (
        <>
            <SiteAppBar />
            <Container sx={{ width: '100%', ...flexCenter }}>
                <Paper sx={{
                    width: '80%', height: "50%", ...flexCenter,
                    margin: "1rem 0rem 0rem 0rem", paddingBottom: '1rem', display: 'flex', flex: 1
                }}>
                    <Typography variant='h3' sx={{ textAlign: 'center' }}>{details.gameInfo.name}</Typography>
                    <Typography sx={{ margin: '0.5rem', fontSize: '1.5rem' }}>
                        Preço:<span> </span>
                        <span style={{ color: 'red', textDecoration: "line-through" }}>
                            {"$" + gameInfo.retailPrice}
                        </span> - <span style={{ color: 'green' }}>{"$" + gameInfo.salePrice}</span>
                    </Typography>
                    <SteamRating></SteamRating>
                    <CheaperStores cheaperStores={cheaperStores} stores={stores} />
                    {gameInfo.metacriticScore !== '0' &&
                        <Paper className='margin-top' style={{
                            padding: '0.5rem', cursor: 'pointer', width: '70%'
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
                        </Paper>}
                    <Button sx={{ margin: '1rem 0rem 1rem 0rem' }} variant="outlined" onClick={() => goToDeal()}>
                        Ir para oferta
                    </Button>
                </Paper>
            </Container>
        </>
    );
}