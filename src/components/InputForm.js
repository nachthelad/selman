import React, { useState } from 'react';
import { Container, Grid, TextField, Button } from '@mui/material';
import Swal from 'sweetalert2';

const InputForm = ({ setFavorites, setCategories, categories }) => {
  const [inputValue, setInputValue] = useState('');
  const [category, setCategory] = useState('');

  // Validar que la URL sea una URL de Instagram
  const isValidInstagramURL = (url) => {
    const pattern = new RegExp('^(https://www.)?instagram.com/([a-zA-Z0-9_](?:(?:[a-zA-Z0-9_]|(?:\\.(?=.))){0,28}(?:[a-zA-Z0-9_]))?)/?$');
    return pattern.test(url);
  };

  // Añadir la URL favorita
  const addFavorite = () => {
    if (isValidInstagramURL(inputValue)) {
      const username = inputValue.split('instagram.com/')[1].replace('/', '');

      const newFavorite = {
        username,
        url: inputValue,
        category
      };

      setFavorites(prevFavorites => [...prevFavorites, newFavorite]);

      if (!categories.includes(category)) {
        setCategories(prevCategories => [...prevCategories, category]);
      }

      setInputValue('');
      setCategory('');
      Swal.fire({
        title: 'Agregado con éxito!',
        text: 'Tu favorito ha sido agregado.',
        icon: 'success'
      });
    } else {
        Swal.fire({
            title: 'Error!',
            text: 'Por favor, ingresa una URL válida de Instagram.',
            icon: 'error'
          });
    }
  };

  return (
    <Container style={{ textAlign: 'center', paddingTop: '30px' }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="URL de Instagram"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            style={{ marginBottom: '20px', color: 'white' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            label="Categoría"
            value={category}
            onChange={e => setCategory(e.target.value)}
            style={{ marginBottom: '20px', color: 'white'  }}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={addFavorite}>
            Agregar
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default InputForm;
