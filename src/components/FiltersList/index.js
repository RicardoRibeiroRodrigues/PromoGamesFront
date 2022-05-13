import {
  FormControl, InputLabel, Select, MenuItem,
  Button, Checkbox, FormControlLabel, Collapse,
  List, ListItemButton, ListItemText,
} from '@mui/material';
import React, { useState } from "react";
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import "./index.css";

export default function FiltersList(props) {
  const [orderArg, setOrderArg] = useState('Deal Rating');
  const [open, setOpen] = useState(false);

  const storeInit = {};
  for (let store of props.stores) {
    if (store.isActive)
      storeInit[store.storeID] = false;
  }
  const [storeList, setStoreList] = useState(storeInit);

  const handleOrderChange = (event) => {
    setOrderArg(event.target.value);
  }

  const handleClick = () => {
    setOpen(!open);
  }

  const sendFilters = () => {
    let stringListStores = '';
    Object.entries(storeList).forEach(item => {
      if (item[1] && stringListStores)
        stringListStores += `,${item[0]}`;
      if (item[1] && !stringListStores)
        stringListStores += `${item[0]}`;
    });
    let finalStringStores = stringListStores ? `&storeID=${stringListStores}` : '';
    let finalString = `&sortBy=${orderArg}` + finalStringStores;
    props.setFilters(finalString);
    props.setMenuState(false);
  }

  const handleStoreChange = (event) => {
    let id = event.target.id;
    setStoreList({ ...storeList, [id]: !storeList[id] });
  }

  return (
    <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column' }}>
      <h2>Filtros</h2>
      <FormControl sx={{ width: '80%', alignSelf: 'center' }}>
        <ListItemButton sx={{ border: '1px solid grey' }} onClick={handleClick}>
          <ListItemText primaryTypographyProps={{ variant: 'h8', sx: { fontWeight: 'bold' } }} primary='Selecionar lojas a serem mostradas'></ListItemText>
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ display: 'flex', flexDirection: 'column' }}>
            {props.stores.map((store) => (
              <FormControlLabel
                control={
                  <Checkbox id={store.storeID} checked={storeList[store.storeID]} onChange={handleStoreChange} name={store.storeName} />
                }
                label={store.storeName}
              />))}
          </List>
        </Collapse>
      </FormControl>
      <h2>Ordem</h2>
      <FormControl sx={{ width: '80%', alignSelf: 'center' }}>
        <InputLabel id="demo-simple-select-label">Ordenar por:</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={orderArg}
          label="Order"
          onChange={handleOrderChange}
        >
          <MenuItem value={'Savings'}>Porcentagem de desconto</MenuItem>
          <MenuItem value={'Title'}>Título</MenuItem>
          <MenuItem value={'Price'}>Preço</MenuItem>
          <MenuItem value={'Metacritic'}>Nota na metacritic</MenuItem>
        </Select>
      </FormControl>
      <Button sx={{ width: '50%', alignSelf: 'center', marginTop: '1rem' }} onClick={() => sendFilters()} variant='outlined'>
        Aplicar filtros/ordem
      </Button>
    </div >
  );
}
