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

  useEffect(() => {
    axios.get("https://www.cheapshark.com/api/1.0/deals?AAA=1" + filters)
      .then((res) => setDeals(res.data));
    axios.get("https://www.cheapshark.com/api/1.0/stores")
      .then((res) => setStores(res.data));
  }, [filters]);

  return (
    <>
      <SiteAppBar />
      <div className="flex-column">
        <ExpansibleMenu stores={stores} setFilters={setFilters} />
        <div className='container'>
          {deals.map((deal) => (
            <GameCard key={`deal__${deal.dealID}`} deal={deal} store={stores[parseInt(deal.storeID) - 1]} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
