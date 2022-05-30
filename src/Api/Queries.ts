import { IPlace } from '../interface/types';
import axios from 'axios';

const appId: string = '09751beec32b942e4aaa48037630da19';
const apiUrl = (
  appId: string,
  city: string,
  countryCode?: string,
  isForecast?: boolean
) => {
  const place = city + (countryCode ? ', ' + countryCode : '');
  const param = !isForecast ? 'weather?' : 'forecast?';
  return `https://api.openweathermap.org/data/2.5/${param}q=${place}&appid=${appId}&units=metric`;
};

export const getMainViewData = async (places: IPlace[]) => {
  const queries: Promise<any>[] = [];
  places.forEach((place: IPlace) => {
    queries.push(axios.get(apiUrl(appId, place.city, place.countryCode)));
  });
  try {
    const response = await Promise.all(queries);
    const data = response.map((res) => res.data);
    return data;
  } catch {
    throw Error('Cannot get data... try again later');
  }
};

export const getDetailsViewData = async (place: IPlace) => {
  try {
    const response = await axios.get(
      apiUrl(appId, place.city, place.countryCode, true)
    );
    const data = response.data;
    return data;
  } catch {
    throw Error('Cannot get data... try again later');
  }
};
