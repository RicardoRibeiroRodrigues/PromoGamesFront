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
    // 


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

  return (
    <div>
      <SiteAppBar setFilters={setFilters} filters={filters} />
      <div className="flex-column">
        <ExpansibleMenu stores={stores} setFilters={setFilters}
          onlyFavorites={{ 'state': onlyFavorites, 'setter': setOnlyFavorites }} />
        <div className='container'>
          {!onlyFavorites ? deals.map((deal) => (
            <GameCard key={`deal__${deal.dealID}`} id={deal.dealID} favorite={isFavorite(deal.dealID)}
              deal={deal} store={stores[parseInt(deal.storeID) - 1]} setFavorites={setFavorites} />
          )) : favorites.map((deal) => (<GameCard key={`deal__${deal['deal_id']}`} id={deal['deal_id']} favorite={true}
            deal={deal} store={stores[parseInt(deal['store_id']) - 1]} setFavorites={setFavorites} />))}
          <DelayMsg></DelayMsg>
        </div>
      </div>
    </div>
  );
}

export default App;
