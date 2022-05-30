import React, { useCallback, useEffect, useState } from 'react';
import { Route, useParams } from 'react-router-dom';
import { getDetailsViewData } from '../Api/Queries';
import { DetailView } from '../components/DetailView';
import { IPlace } from '../interface/types';
import { getPlace, prepareData } from '../Utils/Functions';
import { Place } from '../Utils/Place';

const DetailsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>('');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [city, setCity] = useState<any>(null);
  const { name } = useParams();

  const getData = useCallback(
    async (city: IPlace) => {
      try {
        const data = await getDetailsViewData(city);
        setWeatherData(prepareData(data));
        setCity(data.city);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        throw error;
      }
    },
    [name]
  );

  useEffect(() => {
    if (name) {
      const place = getPlace(name);
      getData(place);
    }
  }, [name]);
  return (
    <div className="details-page">
      {error ? (
        <div className="error"></div>
      ) : isLoading ? (
        <div className="title"> Loading data please wait...</div>
      ) : (
        <React.Fragment>
          <div className="details-page-header">
            {city.name + ', ' + city.country}
          </div>
          <div className="details-page-data-container">
            {weatherData.map((elem: any, index: any) => (
              <DetailView key={index} weatherData={elem} isDetail={true} />
            ))}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default DetailsPage;
