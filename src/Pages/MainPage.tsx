import React, { useContext, useEffect, useState, useCallback } from 'react';
import { getMainViewData } from '../Api/Queries';
import { DataContext } from '..';
import { IPlace } from '../interface/types';
import { DetailView } from '../components/DetailView';
import { useNavigate } from 'react-router-dom';

const MainPage: React.FC = () => {
  const cities = useContext<any>(DataContext);
  const [weatherData, setWeatherData] = useState<any>([]);
  const [city, setCity] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const getData = useCallback(
    async (cities: IPlace[]) => {
      try {
        const data = await getMainViewData(cities);
        setWeatherData(data);
      } catch (error) {
        throw error;
      }
    },
    [cities]
  );

  useEffect(() => {
    getData(cities);
  }, [cities]);

  const onChangeCity = (city: string) => {
    setCity(city);
  };

  const showDetails = () => {
    if (!city || city.length < 4) {
      setError('city is too short, type at least 4 chars');
      return;
    }
    navigate(`/Cities/${city}`);
  };

  return (
    <div className="main-page">
      <div className="main-page-container">
        <div className="main-page-form-container">
          <input
            value={city}
            name="city"
            type="text"
            placeholder="city with optional country code... (London, uk)"
            onChange={(e) => onChangeCity(e.target.value)}
          />
          <button onClick={() => showDetails()}>Show</button>
        </div>
        {error && <div className="error"> {error}</div>}
        <div className="main-page-data-container">
          {weatherData
            ? weatherData.map((record: any) => {
                return <DetailView key={record.id} weatherData={record} />;
              })
            : 'Loading data, please wait...'}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
