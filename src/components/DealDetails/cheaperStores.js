import React from 'react';


export default function CheaperStores(props) {
    const { cheaperStores, stores } = props;

    return (
        <div style={{ border: '1px solid black' }}>
            <h7>Lojas mais baratas: </h7>
            {
                cheaperStores.map((deal) => (
                    <span>A loja {deal.dealID} tem está vendendo esse jogo mais barato!</span>
                ))
            }
        </div>
    );
}