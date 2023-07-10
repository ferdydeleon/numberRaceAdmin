import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import { transitions,positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const App = () => {
  const routing = useRoutes(routes);
  const options = {
    timeout: 5000,
    position: positions.MIDDLE,
  // you can also just use 'scale'
  transition: transitions.SCALE
  };
  return (
    <Provider template={AlertTemplate} {...options}>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
    </Provider>
  );
};

export default App;
