import React, { useEffect } from 'react';

import {useTheme} from 'styled-components'
import Header from '../Header';
import PostsList from '../PostsList';
import Footer from '../Footer';

export default function Layout({ onToggleTheme, selectedTheme }) {
  const theme = useTheme();

  useEffect(() =>{
    console.debug('<Layout /> saiu da tela.')
  },[selectedTheme])
  return (
    <>
      <Header onToggleTheme={onToggleTheme} selectedTheme={selectedTheme} />
      <PostsList />
      <Footer onToggleTheme={onToggleTheme} selectedTheme={selectedTheme} />

      <div style={{
        marginTop: 24,
        backgroundColor: theme.footerBackgroundColor,
        padding: 24,
      }} >
        Oi, tudo bem com você?
      </div>
    </>
  );
}
