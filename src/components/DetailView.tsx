import moment from 'moment';
interface Props {
  weatherData: any;
  isDetail?: boolean;
  city?: any;
}

export const DetailView = ({ weatherData, isDetail }: Props): JSX.Element => {
  const weather = weatherData.weather[0];
  const { main } = weatherData;
  const { REACT_APP_API_DOMAIN: domain, REACT_APP_API_SERVER_IMG: server } =
    process.env;

  const imgUrl = `${domain}${server}/img/wn/${weather.icon}@2x.png`;

  let currentDate;
  let dayOfTheWeek;
  if (isDetail) {
    currentDate = weatherData.dt_txt.split(' ')[0];
    dayOfTheWeek = moment(currentDate).format('dddd');
  }

  return (
    <div className="detail-view" key={weatherData.id}>
      {!isDetail ? weatherData.name : null}
      <br />
      <img src={imgUrl} />
      {!isDetail ? (
        <div className="items">
          <div className="value">{weather.description}</div>
          <div className="title">Temp.</div>
          <div className="value">{Math.floor(main.temp)} °C</div>
          <div className="value">max. {Math.floor(main.temp_max)} °C</div>
        </div>
      ) : (
        <div className="items">
          <div className="value">{weather.description}</div>
          <div className="value">{currentDate}</div>
          <div className="value">{dayOfTheWeek}</div>
          <div className="title">Temp.</div>
          <div className="value">nig {main.night_temp} °C</div>
          <div className="value">mor {main.morning_temp} °C</div>
          <div className="value">day {main.day_temp} °C</div>
          <div className="value">max. {main.temp_max} °C</div>
          <div className="value">min. {main.temp_min} °C</div>
          <div className="value">mode {main.mode_value} °C</div>
          <div className="value">humidity. {main.humidity}</div>
        </div>
      )}
    </div>
  );
};
