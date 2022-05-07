import React, { useState } from "react";
import "./index.css";
import { Box, Typography, IconButton } from '@mui/material';
import axios from "axios";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

export default function Gamecard(props) {
  const { deal, store } = props;
  const [favorite, setFavorite] = useState(false);

  const boxStyle = {
    fontSize: "10px",
    margin: '1rem 1rem 0rem 1rem',
    width: 300,
    height: 300,
    bgcolor: 'lightgrey',
    border: '1px solid black',
    borderRadius: '10px',
    '&:hover': {
      backgroundColor: 'grey',
      opacity: [0.9, 0.8, 0.7],
      cursor: 'pointer'
    },
  }
  const redirectDeal = async () => {
    const dealLink = `https://www.cheapshark.com/api/1.0/deals?id=${deal.id}`;
    // Aprender sobre react router!!
    const detalhes = await axios.get(dealLink)
      .then((res) => res.data);
  }
  const metacriticScore = parseFloat(deal.metacriticScore) / 10;
  const saving = parseInt(deal.savings);

  return (
    <Box className="column-flex" sx={boxStyle} onClick={() => redirectDeal()}>
      <div className="row-flex">
        <h1>{props.deal.title}</h1>
        <IconButton onClick={() => setFavorite(!favorite)}>
          {favorite ? <StarIcon /> : <StarBorderIcon />}
        </IconButton>
      </div>
      <img src={props.deal.thumb} alt='logo do jogo' width={100} />
      {/* {props.deal.metacriticScore !== '0' ?
        <div className='margin-top'>
          <Typography component="legend" >
            <Button variant="outlined" onClick={() => redirect(`https://www.metacritic.com/${deal.metacriticLink}`)}>
              Meta critic score:
            </Button>
          </Typography>
          <Rating name="customized-10" defaultValue={0} value={metacriticScore} max={10} precision={0.5} readOnly />
        </div>
        : <></>} */}
      <Typography >Porcentagem de desconto: <span className="saving-title">{saving + '%'}</span></Typography>

      <div className='row-flex'>
        <Typography>Loja da oferta: {store.storeName}</Typography>
        <img className="logo-right" src={`https://www.cheapshark.com${store.images.logo}`} alt="logo da loja" width={50} />
      </div>
    </Box>
  );
}
