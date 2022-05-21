import React from 'react';
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export default function CheaperStores(props) {
    const { cheaperStores, stores } = props;
    console.log(cheaperStores);

    const handleOtherOffer = (dealID) => {
        window.open(`https://www.cheapshark.com/redirect?dealID=${dealID}`, '_blank');
    }

    if (cheaperStores.length > 0) {
        return (
            <Paper sx={{ padding: '0.5rem', margin: '0.5rem', width: '70%' }} variant="elevation" >
                <Typography variant='h6' >Lojas mais baratas: </Typography>
                {
                    cheaperStores.map((deal) => (
                        <p>
                            A loja
                            <span key={`deal__${deal.dealID}`} style={{ color: 'green' }}>
                                {" " + stores[parseInt(deal.storeID) - 1].storeName + " "}
                            </span>
                            está com vendendo esse jogo por: <span style={{ color: 'green' }}>
                                {"$" + deal.salePrice}
                            </span>
                            <Button onClick={() => handleOtherOffer(deal.dealID)}>
                                Conferir!
                            </Button>
                        </p>
                    ))
                }
            </Paper>
        );
    }
}