import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
//import Cookies from 'universal-cookie';

export function NotFound() {

  /*   function Logout() {
      const cookie = new Cookies();
      cookie.remove('@diabetico_token');
      localStorage.removeItem('@diabetico_token');
      window.location.href = '/';
    } */
  return (
    <div>
      <Container
        style={{
          height: '75vh',
          width: '100vw',
          display: 'flex',
        }}
        maxWidth="lg">
        <Box
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <Typography
            variant="h1"
            style={{ fontWeight: '700', color: '#DC0032', fontSize: '87px' }}>
            ERROR 404 Não Encontrado
            <Typography
              variant="subtitle1"
              style={{
                fontWeight: '400',
                color: 'rgba(0, 0, 0, 0.67)',
                fontSize: '32px',
                lineHeight: '38px',
              }}>
              Sessão expirada ou página não encontrada!!
            </Typography>
          </Typography>
          <Button
            //onClick={Logout}
            variant="contained"
            color="secondary"
            style={{ maxWidth: '200px', marginTop: '60px', fontWeight: 'bold' }}>
            voltar para Login
          </Button>
        </Box>
        <Box
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}></Box>
      </Container>
    </div>
  );
}
