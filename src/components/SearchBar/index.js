import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export default function SearchBar(props) {
  const { filters, setFilters } = props;
  const [content, setContent] = useState('');


  const handleChange = (event) => {
    setContent(event.target.value);
  }

  const handleSearch = () => {
    const stringSearch = `&title=${content}`;
    setFilters(filters + stringSearch);
    setContent('');
    return false;
  };

  const handleKeys = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  }


  return (
    <Paper
      component="form"
      sx={{
        marginRight: '2.5rem', p: '2px 4px', display: 'flex', alignItems: 'center',
        width: 400, background: 'none', borderRadius: 100, border: '2px solid black'
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Pesquise por um jogo específico"
        onChange={handleChange}
        onSubmit={handleSearch}
        formAction="#"
        value={content}
        inputProps={{
          formAction: '#', onSubmit: handleSearch, onKeyDown: handleKeys
        }}
      />
      <IconButton onClick={handleSearch} sx={{ p: '10px' }}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}
