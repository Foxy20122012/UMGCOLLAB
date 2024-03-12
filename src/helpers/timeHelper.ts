import * as moment from 'moment-timezone'

export function getTimeAgoFromNow(dateTimeStr: string, t: any): string {
  if (dateTimeStr === '-1') {
    return t('just_now')
  }
  const currentDate = new Date()
  const inputDate = new Date(dateTimeStr)

  if (isNaN(inputDate.getTime())) {
    return ''
  }

  const elapsedMilliseconds = currentDate.getTime() - inputDate.getTime()
  const elapsedSeconds = elapsedMilliseconds / 1000
  const elapsedMinutes = elapsedSeconds / 60
  const elapsedHours = elapsedMinutes / 60
  const elapsedDays = elapsedHours / 24

  if (elapsedMinutes < 1) {
    return t('just_now')
  } else if (elapsedMinutes < 60) {
    const minutes = Math.floor(elapsedMinutes)
    return `${t('hace')} ${minutes} ${t('minute')}${
      minutes === 1 ? '' : 's'
    } ${t('ago')}`
  } else if (elapsedHours < 24) {
    const hours = Math.floor(elapsedHours)
    return `${t('hace')} ${hours} ${t('hour')}${hours === 1 ? '' : 's'}  ${t(
      'ago'
    )}`
  } else {
    const days = Math.floor(elapsedDays)
    return `${t('hace')} ${days} ${t('day')}${days === 1 ? '' : 's'}  ${t(
      'ago'
    )}`
  }
}

export function formatDate(inputDatetime: string): string {
  const inputDate = new Date(inputDatetime)
  if (isNaN(inputDate.getTime())) {
    return inputDatetime
  }

  const day = String(inputDate.getDate()).padStart(2, '0')
  const month = String(inputDate.getMonth() + 1).padStart(2, '0') // Month is 0-based
  const year = String(inputDate.getFullYear())

  return `${day}/${month}/${year}`
}

export function formatDateTime(dateTimeString: string): string {
  const date = new Date(dateTimeString)
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date')
  }

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = String(date.getFullYear())
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${day}/${month}/${year} ${hours}:${minutes}`
}

export function getDateTimePart(
  datetime: string,
  part: 'day' | 'month' | 'year'
): number | null {
  const date = new Date(datetime)

  if (isNaN(date.getTime())) {
    // Invalid datetime string
    return null
  }

  switch (part) {
    case 'day':
      return date.getDate()
    case 'month':
      return date.getMonth() + 1 // Months are 0-based, so add 1
    case 'year':
      return date.getFullYear()
    default:
      return null // Invalid part parameter
  }
}

export function getMonthName(
  t: (v: string) => string,
  monthNumber: number,
  nchar?: number
): string | null {
  const monthNames = [
    'january',
    'february',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ]

  if (monthNumber < 1 || monthNumber > 12) {
    return null // Invalid month number
  }

  const m = monthNames[monthNumber - 1]

  const mm = t(m)

  if (nchar && nchar < mm.length) {
    return mm.slice(0, nchar)
  }

  return mm
}

export function compareDateToCurrent(inputDate: string, t: any) {
  const currentDate = new Date()
  const targetDate = new Date(inputDate)

  if (currentDate.getTime() > targetDate.getTime()) {
    return t('ended')
  }

  // Check if the input date is in the same day as the current date
  if (
    currentDate.getDate() === targetDate.getDate() &&
    currentDate.getMonth() === targetDate.getMonth() &&
    currentDate.getFullYear() === targetDate.getFullYear()
  ) {
    const hours = targetDate.getHours()
    const minutes = targetDate.getMinutes()

    if (currentDate.getTime() < targetDate.getTime()) {
      if (currentDate.getDate() === targetDate.getDate() - 1) {
        return `${t('tomorrow')} ${hours}:${
          minutes < 10 ? '0' + minutes : minutes
        }`
      } else {
        return `${t('today')} ${hours}:${
          minutes < 10 ? '0' + minutes : minutes
        }`
      }
    }
  } else {
    return formatDate(inputDate)
  }
}

export function getRemainingDays(
  inputDate: string,
  t: any,
  optionalFinishedText?: string
): any {
  const currentDate = new Date().getTime()
  const targetDate = new Date(inputDate).getTime()

  if (currentDate >= targetDate) {
    return optionalFinishedText ? optionalFinishedText : t('expired')
  }

  const timeRemaining = targetDate - currentDate
  return Math.floor(timeRemaining / (1000 * 60 * 60 * 24))
}

export function isValidDate(dateStr: string): boolean {
  const parsedDate = new Date(dateStr)
  // Check if the parsedDate is a valid date and the input string doesn't convert to "Invalid Date"
  return (
    !isNaN(parsedDate.getTime()) && parsedDate.toISOString() !== 'Invalid Date'
  )
}

export function getConbinedPodIsoDateString(
  podFecha: string,
  podHora: string
): string {
  // Extracting the date and time components
  try {
    const fechaPart: string = podFecha.split('T')[0]
    const horaPart: string[] = podHora.split(':')

    // Creating a moment object with timezone
    const combinedDateTime = moment.tz(
      `${fechaPart} ${horaPart.join(':')}`,
      'YYYY-MM-DD HH:mm:ss',
      'UTC'
    )

    // Formatting the result as a string
    const resultDateString: string = combinedDateTime.toISOString()
    return resultDateString
  } catch (err) {
    return podFecha
  }
}


export function subastaFormatDateFromIso(isoDate: string){
  try {
  const originalDateString = isoDate
  const originalDateObject = new Date(originalDateString)

  const year = originalDateObject.getFullYear()
  const month = originalDateObject.getMonth() + 1 // Adding 1 to convert from zero-based to one-based month
  const day = originalDateObject.getDate()
  const hours = originalDateObject.getUTCHours()
  const minutes = originalDateObject.getUTCMinutes()

  const convertedDateString = `${year}-${month < 10 ? '0' : ''}${month}-${
    day < 10 ? '0' : ''
  }${day}T${hours < 10 ? '0' : ''}${hours}:${
    minutes < 10 ? '0' : ''
  }${minutes}`

  return convertedDateString}
  catch(err){
    return new Date().toLocaleString()
  }
}


export function getMonthDayFormat(isoDate: string, t: (val: string) => string){

  // Given date and time
const originalDateString = isoDate;

// Convert to Date object
const originalDateObject = new Date(originalDateString);

// Extract month and day components
// const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const month = t(`month_min_${originalDateObject.getUTCMonth() + 1}`);
const day = originalDateObject.getUTCDate();

// Format the components into the desired string
const convertedDateString = `${month} ${day}`;

return convertedDateString
}

export function getTodayInFormatDate(){
  const currentDate: Date = new Date();
  const year: number = currentDate.getFullYear();
  const month: number = currentDate.getMonth() + 1;
  const day: number = currentDate.getDate();

  const formattedDate: string = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

  return formattedDate
}

export function addHoursToDate(dateString: string, hoursToAdd: number): Date {
  // Parse the input date string
  const date = new Date(dateString);

  // Add hours to the date
  date.setHours(date.getHours() + hoursToAdd);

  return date;
}