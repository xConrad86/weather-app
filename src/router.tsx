import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './Pages/MainPage';
import ErrPage from './Pages/ErrPage';
import DetailsPage from './Pages/DetailsPage';

const Router: React.FC = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/Cities/:name" element={<DetailsPage />} />
        <Route path="*" element={<ErrPage />} />
      </Routes>
    </React.Fragment>
  );
};

export default Router;
