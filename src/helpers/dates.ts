import { fixStoryblokUtcDate } from './date-helpers';

export const GetDatesWithFullWeekNames = (dateObj: Date) => {
  const abbreviatedDate = dateObj.toDateString();
  const dateSlices = abbreviatedDate.split(' ');
  switch (dateSlices[0]) {
    case 'Mon':
      dateSlices[0] = 'Monday,';
      break;
    case 'Tue':
      dateSlices[0] = 'Tuesday,';
      break;
    case 'Wed':
      dateSlices[0] = 'Wednesday,';
      break;
    case 'Thu':
      dateSlices[0] = 'Thursday,';
      break;
    case 'Fri':
      dateSlices[0] = 'Friday,';
      break;
    case 'Sat':
      dateSlices[0] = 'Saturday,';
      break;
    case 'Sun':
      dateSlices[0] = 'Sunday,';
      break;
    default:
      console.error('Invalid Day');
  }
  dateSlices[2] = `${dateSlices[2]},`;
  return dateSlices.join(' ');
};

export const resolveTimeStringForDate = (timeString: string) => {
  let newTime = `${timeString}`;
  try {
    if (timeString.substring(0, 2).includes(':')) {
      newTime = '0' + timeString;
    }
    if (/((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/.test(newTime)) {
      if (newTime.charAt(newTime.length - 2) === 'p') {
        const updatedTime = newTime.slice(0, newTime.length - 2);
        const hour = Number(updatedTime.substring(0, 2));
        let newHour = 0;
        if (hour !== 12) {
          newHour = hour + 12;
        }
        return newHour.toString() + updatedTime.slice(2).trim();
      } else {
        return newTime.slice(0, newTime.length - 2).trim();
      }
    }
    if (/^(0?[0-9]|1[0-2]):[0-5][0-9]$/.test(newTime)) {
      return newTime.trim();
    }
    return '00:00';
  } catch (err) {
    return '00:00';
  }
};

export const replaceTimeInDate = (date: string, timeString: string) => {
  const newTimeString = resolveTimeStringForDate(timeString);
  const newDateString = date.replace('00:00', newTimeString);

  return new Date(fixStoryblokUtcDate(newDateString) as string);
};
