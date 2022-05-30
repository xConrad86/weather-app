import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import reportWebVitals from './reportWebVitals';
import Router from './router';
import { cities } from './Utils/Data';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
export const DataContext = React.createContext({});

root.render(
  <BrowserRouter>
    <DataContext.Provider value={cities}>
      <Router />
    </DataContext.Provider>
  </BrowserRouter>
);

reportWebVitals();
