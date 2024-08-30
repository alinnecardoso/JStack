import React, { useState, useMemo, useEffect } from 'react';

import GlobalStyle from './styles/global';
import Layout from './components/Layout';
import { ThemeProvider } from 'styled-components';

import themes from './styles/themes'

const [ theme, setTheme ] = useState('dark');

const currentTheme = useMemo(() => {
  return themes[theme] || themes.dark;
}, [theme]);

function handleToggleTheme(){
  setTheme(prevState => prevState === 'dark' ? 'light' : 'dark');
}

//Função de Efeito
//É executada toda vez que o componente for renderizado
useEffect(() => {
  console.debug('useEffect executou')
}, []);

function App() {
  return (
    <ThemeProvider theme={currentTheme} >
      <GlobalStyle />
      <Layout 
      onToggleTheme={handleToggleTheme}
      selectedTheme={theme}
      />
    </ ThemeProvider>
  );
};

export default App;
