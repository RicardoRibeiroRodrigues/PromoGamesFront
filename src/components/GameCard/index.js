import React, { useState } from "react";
import "./index.css";
import { Tooltip, Card, CardMedia, Typography, IconButton, CardContent, Button } from '@mui/material';
import axios from "axios";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from "react-router-dom";

export default function Gamecard(props) {
  const { deal, store, id, setFavorites } = props;
  const [favorite, setFavorite] = useState(props.favorite);
  const navigate = useNavigate();

  const cardStyle = {
    width: 345,
    height: 500,
    fontSize: "10px",
    margin: '1rem 1rem 0rem 1rem',
  }
  const redirectDeal = async () => {
    const dealLink = `https://www.cheapshark.com/api/1.0/deals?id=${id}`;
    axios.get(dealLink)
      .then((res) => {
        navigate("/deal", { state: { details: res.data, dealID: id } });
      });
  }
  const saving = parseInt(deal.savings);

  const handleFavorite = () => {
    const body = {
      "deal_id": deal.dealID,
      "title": deal.title,
      "savings": deal.savings,
      "thumb": deal.thumb,
      "store_id": deal.storeID
    }
    if (!favorite) {
      axios
        .post('http://127.0.0.1:8000/api/favorites', body)
        .then((res) => setFavorites(res.data));
    } else {
      axios
        .delete(`http://127.0.0.1:8000/api/favorites`, { data: { 'deal_id': id } })
        .then((res) => setFavorites(res.data));
    }
    setFavorite(!favorite);
  };

  return (
    <Card className="column-flex" sx={{ maxWidth: 345, ...cardStyle }} >
      <CardContent>
        <div className="row-flex">
          <Tooltip title={deal.title} placement="top-start">
            <Typography variant="h6" sx={{
              overflow: "hidden", whiteSpace: 'nowrap', textOverflow: "ellipsis", maxWidth: 300
            }}>{deal.title}</Typography>
          </Tooltip>
          <IconButton onClick={() => handleFavorite()}>
            {favorite ? <StarIcon /> : <StarBorderIcon />}
          </IconButton>
        </div>
      </CardContent>
      <Tooltip title={<img className="max-height" src={deal.thumb}
        alt="Thumb completa"></img>} placement="left-start">
        <div style={{ overflow: 'hidden', width: '100%', position: 'relative' }}>
          <CardMedia
            sx={{ position: 'absolute', objectFit: 'contain', zIndex: 1 }}
            component="img"
            height={250}
            image={deal.thumb}
            alt="Logo do jogo"
          />
          <CardMedia
            component="img"
            height={250}
            sx={{ transform: 'scale(1.1)', filter: 'blur(2px) brightness(50%)' }}
            image={deal.thumb}
            alt="Logo do jogo"
          />
        </div>
      </Tooltip>
      <CardContent sx={{ display: "flex", flexDirection: 'column', alignItems: "center" }}>
        <Typography >Porcentagem de desconto: <span className="saving-title">{saving + '%'}</span></Typography>
        <div className='row-flex'>
          <Typography>Loja da oferta: <span>{store.storeName}</span></Typography>
          <img className="logo-right" src={`https://www.cheapshark.com${store.images.logo}`}
            alt="logo da loja" width={50} />
        </div>
        <Button sx={{ marginTop: '0.6rem' }} onClick={() => redirectDeal()} variant="outlined">
          Ver mais detalhes
        </Button>
      </CardContent>
    </Card >
  );
}
