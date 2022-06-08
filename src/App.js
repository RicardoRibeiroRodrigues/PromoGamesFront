import { useEffect, useState } from "react";
import './App.css';
import GameCard from './components/GameCard';
import axios from 'axios';
import SiteAppBar from "./components/SiteAppBar";
import ExpansibleMenu from "./components/ExpansibleMenu";
import ErrorIcon from '@mui/icons-material/Error';

function App() {
  const [deals, setDeals] = useState([]);
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [timeoutTimer, setTimeoutTimer] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const isFavorite = (dealId) => {
    for (let favorite of favorites) {
      if (favorite['deal_id'] === dealId) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    // Conserta bug que quebrava o site quando uma das promessas era concluida antes da outra
    // e causava bug na renderização. 
    const dealsPromise = axios.get("https://www.cheapshark.com/api/1.0/deals?AAA=1" + filters);
    const storesPromise = axios.get("https://www.cheapshark.com/api/1.0/stores");
    Promise.all([dealsPromise, storesPromise]).then((values) => {
      setDeals(values[0].data);
      setStores(values[1].data);
    });
    axios
      // .get("http://127.0.0.1:8000/api/favorites") // local
      .get("https://afternoon-stream-42339.herokuapp.com/api/favorites")
      .then((res) => setFavorites(res.data));
    // Fazendo o simulado
    axios
      .get(`https://enigmatic-bayou-56424.herokuapp.com/ricardorr7/token`)
      .then((res) => {
        const token = res.data.token;
        axios
          .post("https://enigmatic-bayou-56424.herokuapp.com/ricardorr7/message", { token })
          .then((res) => {
            if (!mensagem)
              setMensagem(res.data.mensagem)
          });

      });

  }, [filters]);

  const DelayMsg = () => {
    setTimeout(() => {
      setTimeoutTimer(true)
    }, 1000);

    return ((timeoutTimer && deals.length === 0) &&
      <div style={{
        border: '1px solid black', borderRadius: '100px', padding: '1rem', backgroundColor: 'red',
        display: 'flex'
      }}>
        <ErrorIcon sx={{ height: '3rem', alignSelf: 'center' }}></ErrorIcon>
        <h2>
          Oops, parece que algo deu errado, ou não existe nenhuma oferta para esse jogo/filtro.
        </h2>
      </div>);
  }

  const MensagemAleatoria = () => {
    return (
      <div style={{
        position: 'absolute',
        color: 'rgba(255, 255, 255, 0.8)',
        zIndex: 1000,
        left: '50%',
        transform: "translate(-50%, 0)",
        marginLeft: 'auto',
        marginRight: 'auto',
        background: "rgba(1, 1, 1, 0.5)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        backdropFilter: "blur(4px)",
        borderRadius: "10px",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        width: '50%',
        padding: '1rem',
      }}>
        <h1 style={{ flexWrap: "wrap" }}>{mensagem}</h1>
      </div >
    );
  }

  return (
    <div>
      <SiteAppBar setFilters={setFilters} filters={filters} />
      <MensagemAleatoria></MensagemAleatoria>
      <div className="flex-column">
        <ExpansibleMenu stores={stores} setFilters={setFilters}
          onlyFavorites={{ 'state': onlyFavorites, 'setter': setOnlyFavorites }} />
        <div className='container'>
          {!onlyFavorites ? deals.map((deal) => (
            <GameCard key={`deal__${deal.dealID}`} id={deal.dealID} favorite={isFavorite(deal.dealID)}
              deal={deal} store={stores[parseInt(deal.storeID) - 1]} stores={stores} setFavorites={setFavorites} />
          )) :
            favorites.map((deal) => (<GameCard key={`deal__${deal['deal_id']}`} id={deal['deal_id']}
              favorite={true}
              deal={deal} store={stores[parseInt(deal['store_id']) - 1]} stores={stores} setFavorites={setFavorites} />))}
          <DelayMsg></DelayMsg>
        </div>
      </div>
    </div>
  );
}

export default App;
