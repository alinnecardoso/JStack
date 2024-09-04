import React, { useState, useMemo, useEffect, useRef } from 'react';

import GlobalStyle from './styles/global';
import Layout from './components/Layout';
import { ThemeProvider } from 'styled-components';

import themes from './styles/themes'

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      theme: 'dark',
    }
  }
  render(){
    const { theme } = this.state;
    return (
      <ThemeProvider theme={themes[theme] || themes.dark} >
        <GlobalStyle />
        <Layout 
        onToggleTheme={() => {
          this.setState({theme: this.state.theme === 'dark' ? 'light' : 'dark'})
        }}
        selectedTheme={theme}
        />
      </ ThemeProvider>
    );
  }
}

// function App() {
//   const [ theme, setTheme ] = useState('dark');
//   const firstRender = useRef(true);

//   const currentTheme = useMemo(() => {
//     return themes[theme] || themes.dark;
//   }, [theme]);

//   function handleToggleTheme(){
//     setTheme(prevState => prevState === 'dark' ? 'light' : 'dark');
//   }

//   //Função de Efeito
//   //É executada toda vez que o componente for renderizado/montado/valor alterado
//   useEffect(() => {
//     localStorage.setItem('theme', JSON.stringify(theme));
//   }, [theme]);

//   useEffect(() => {
//     if(firstRender.current){
//       firstRender.current = false;
//       return;
//     }
//   })
//   return (
//     <ThemeProvider theme={currentTheme} >
//       <GlobalStyle />
//       <Layout 
//       onToggleTheme={handleToggleTheme}
//       selectedTheme={theme}
//       />
//     </ ThemeProvider>
//   );
// };

// export default App;
