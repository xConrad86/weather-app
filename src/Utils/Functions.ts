import { IPlace } from '../interface/types';
import { Place } from './Place';
import cloneDeep from 'lodash/cloneDeep';

export const getPlace = (name: string): IPlace => {
  if (name.includes(',')) {
    const params = name.split(',');
    return new Place(params[0], params[1]);
  } else {
    return new Place(name);
  }
};

const getModeValue = (modeValues: any) => {
  const modeValuesObjs = [];
  let modeValue = 0;
  for (let i = 0; i < modeValues.length; i++) {
    const occurence = getModeValOccurences(modeValues, i);
    modeValuesObjs.push({
      value: modeValues[i],
      occurences: occurence,
    });
  }

  for (let i = 0; i < modeValuesObjs.length; i++) {
    if (i > 0) {
      if (modeValuesObjs[i].occurences >= modeValuesObjs[i - 1].occurences)
        modeValue = modeValuesObjs[i].value;
    } else {
      modeValue = modeValuesObjs[i].value;
    }
  }

  return modeValue;
};

const getModeValOccurences = (modeValues: [], chosenIndex: number) => {
  let occurences = 1;
  for (let i = 0; i < modeValues.length; i++) {
    const chosenVal = modeValues[chosenIndex];
    if (chosenVal === modeValues[i]) {
      occurences += 1;
    }
  }
  return occurences;
};

export const prepareData = (data: any) => {
  const { list } = data;
  console.log(list);
  const newList: any[] = [];
  let modeValues = [];
  let occurences = 0;
  let humidity = 0;
  let meanVal = 0;
  let modeVal = 0;
  let morningTemp;
  let dayTemp;
  let nightTemp;

  for (let i = 0; i < list.length; i++) {
    const dayTime = list[i];
    let previousDateTime;
    let previousDay;
    let maxVal;
    let minVal;

    if (i > 0) {
      previousDay = list[i - 1].dt_txt.split(' ')[0];
      previousDateTime = cloneDeep(list[i - 1]);
    }
    const currentDay = dayTime.dt_txt.split(' ')[0];
    const currentTime = dayTime.dt_txt.split(' ')[1];

    if (currentDay !== previousDay && i > 0) {
      humidity = Math.floor(humidity / occurences);
      modeVal = getModeValue(modeValues);
      meanVal = Math.floor(meanVal / occurences);
      previousDateTime.main.temp_max = isNaN(maxVal)
        ? 'n/a'
        : Math.floor(maxVal);
      previousDateTime.main.temp_min = isNaN(minVal)
        ? 'n/a'
        : Math.floor(minVal);
      previousDateTime.main.humidity = humidity;
      previousDateTime.main.mode_value = modeVal;
      previousDateTime.main.mean_value = meanVal;
      previousDateTime.main.night_temp = isNaN(nightTemp)
        ? 'n/a'
        : Math.floor(nightTemp);
      previousDateTime.main.morning_temp = isNaN(morningTemp)
        ? 'n/a'
        : Math.floor(morningTemp);
      previousDateTime.main.day_temp = isNaN(dayTemp)
        ? 'n/a'
        : Math.floor(dayTemp);
      newList.push(previousDateTime);
      occurences = 0;
      modeValues = [];
    }

    occurences += 1;
    if (maxVal === undefined) {
      maxVal = dayTime.main.temp_max;
    } else {
      maxVal = dayTime.main.temp_max > maxVal ? dayTime.main.temp_max : maxVal;
    }
    if (minVal === undefined) {
      minVal = dayTime.main.temp_min;
    } else {
      minVal = dayTime.main.temp_min < minVal ? dayTime.main.temp_min : minVal;
    }
    modeValues.push(Math.floor(dayTime.main.temp));
    humidity += dayTime.main.humidity;
    meanVal += dayTime.main.temp;
    if (currentTime === '00:00:00') {
      nightTemp = dayTime.main.temp;
    } else if (currentTime === '06:00:00') {
      morningTemp = dayTime.main.temp;
    } else if (currentTime === '12:00:00') {
      dayTemp = dayTime.main.temp;
    }
  }

  return newList;
};
