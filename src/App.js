import { useEffect, useState } from "react";
import './App.css';
import GameCard from './components/GameCard';
import axios from 'axios';
import SiteAppBar from "./components/SiteAppBar";
import ExpansibleMenu from "./components/ExpansibleMenu";

function App() {
  const [deals, setDeals] = useState([]);
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  const isFavorite = (dealId) => {
    for (let favorite of favorites) {
      if (favorite['deal_id'] === dealId) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    axios.get("https://www.cheapshark.com/api/1.0/deals?AAA=1" + filters)
      .then((res) => setDeals(res.data));
    axios.get("https://www.cheapshark.com/api/1.0/stores")
      .then((res) => setStores(res.data));
    axios
      .get("http://127.0.0.1:8000/api/favorites")
      .then((res) => setFavorites(res.data));
  }, [filters]);

  return (
    <>
      <SiteAppBar />
      <div className="flex-column">
        <ExpansibleMenu stores={stores} setFilters={setFilters}
          onlyFavorites={{ 'state': onlyFavorites, 'setter': setOnlyFavorites }} />
        <div className='container'>
          {!onlyFavorites ? deals.map((deal) => (
            <GameCard key={`deal__${deal.dealID}`} id={deal.dealID} favorite={() => isFavorite(deal.dealID)}
              deal={deal} store={stores[parseInt(deal.storeID) - 1]} setFavorites={setFavorites} />
          )) : favorites.map((deal) => (<GameCard key={`deal__${deal['deal_id']}`} id={deal['deal_id']} favorite={true}
            deal={deal} store={stores[parseInt(deal['store_id']) - 1]} setFavorites={setFavorites} />))}
        </div>
      </div>
    </>
  );
}

export default App;
