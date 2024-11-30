import React, { useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Matrix } from './components/Matrix';
import { LessonNavigator } from './components/LessonNavigator';
import { styled } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00ff00',
    },
    background: {
      default: '#000000',
      paper: '#001400',
    },
  },
  typography: {
    fontFamily: 'Courier New, monospace',
  },
});

const AppContainer = styled('div')`
  min-height: 100vh;
  background: #000000;
  color: #00ff00;
`;

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    WebApp.ready();
    const initData = WebApp.initData || {};
    setUser(initData.user);
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppContainer>
        <Matrix />
        <LessonNavigator />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
