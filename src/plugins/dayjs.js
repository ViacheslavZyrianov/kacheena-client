import dayjs from 'dayjs'
import enLocale from 'dayjs/locale/en'
import ukLocale from 'dayjs/locale/uk'

import dayjsRecur from 'dayjs-recur'
import weekday from 'dayjs/plugin/weekday'

switch(localStorage.kacheena_locale || 'en') {
  case 'en':
    dayjs.locale(enLocale)
    break
  case 'uk':
    dayjs.locale(ukLocale)
    break
  default:
    dayjs.locale(enLocale)
    break
}

dayjs.extend(dayjsRecur)
dayjs.extend(weekday)

export default dayjs