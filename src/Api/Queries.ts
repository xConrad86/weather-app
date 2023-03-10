import { IPlace } from '../interface/types';
import axios from 'axios';

const appId: string = '09751beec32b942e4aaa48037630da19';
const apiUrl = (
  appId: string,
  city: string,
  countryCode?: string,
  isForecast?: boolean
) => {
  const {
    REACT_APP_API_DOMAIN: domain,
    REACT_APP_API_SERVER: server,
    REACT_APP_API_KEY: key,
  } = process.env;

  const place = city + (countryCode ? ',%20' + countryCode : '');
  const param = !isForecast ? 'weather?' : 'forecast?';
  const url = `${domain}${server}/data/2.5/${param}q=${place}&appid=${key}&units=metric`;

  console.log(url);
  return url;
};

export const getMainViewData = async (places: IPlace[]) => {
  const queries: Promise<any>[] = [];
  places.forEach((place: IPlace) => {
    queries.push(axios.get(apiUrl(appId, place.city, place.countryCode)));
  });
  try {
    console.log(queries);
    const response = await Promise.all(queries);
    const data = response.map((res) => res.data);
    console.log(data);
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
