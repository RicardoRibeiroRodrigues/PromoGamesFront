import React, { useState } from "react";
import "./index.css";
import { Tooltip, Card, CardMedia, Typography, IconButton, CardContent, Button } from '@mui/material';
import axios from "axios";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from "react-router-dom";

export default function Gamecard(props) {
  const { deal, store } = props;
  const [favorite, setFavorite] = useState(false);
  const navigate = useNavigate();

  const cardStyle = {
    width: 345,
    height: 500,
    fontSize: "10px",
    margin: '1rem 1rem 0rem 1rem',
  }
  const redirectDeal = async () => {
    const dealLink = `https://www.cheapshark.com/api/1.0/deals?id=${deal.dealID}`;
    axios.get(dealLink)
      .then((res) => {
        navigate("/deal", { state: { details: res.data, dealID: deal.dealID } });
      });
  }
  // const metacriticScore = parseFloat(deal.metacriticScore) / 10;
  const saving = parseInt(deal.savings);



  return (
    <Card className="column-flex" sx={{ maxWidth: 345, ...cardStyle }} >
      <CardContent>
        <div className="row-flex">
          <Tooltip title={deal.title} placement="top-start">
            <Typography variant="h4" sx={{
              overflow: "hidden", whiteSpace: 'nowrap', textOverflow: "ellipsis", maxWidth: 300
            }}>{deal.title}</Typography>
          </Tooltip>
          <IconButton onClick={() => setFavorite(!favorite)}>
            {favorite ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
        </div>
      </CardContent>
      <Tooltip title={<img className="max-height" src={deal.thumb} alt="Thumb completa"></img>} placement="left-start">
        <CardMedia
          component="img"
          height={250}
          // sx={{ width: '50%' }}
          image={deal.thumb}
          alt="Logo do jogo"
        />
      </Tooltip>
      <CardContent sx={{ display: "flex", flexDirection: 'column', alignItems: "center" }}>
        <Typography >Porcentagem de desconto: <span className="saving-title">{saving + '%'}</span></Typography>
        <div className='row-flex'>
          <Typography>Loja da oferta: <span>{store.storeName}</span></Typography>
          <img className="logo-right" src={`https://www.cheapshark.com${store.images.logo}`} alt="logo da loja" width={50} />
        </div>
        <Button sx={{ marginTop: '0.6rem' }} onClick={() => redirectDeal()} variant="outlined">Ver mais detalhes</Button>
      </CardContent>
    </Card >
  );
}
