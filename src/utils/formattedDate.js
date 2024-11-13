import { date } from 'quasar'

export function getFormattedDate () {
  const now = new Date()
  const offsetDate = date.extractDate(now.toISOString(), 'YYYY-MM-DDTHH:mm:ss.SSSZ')
  return date.formatDate(offsetDate, 'YYYY-MM-DD HH:mm')
}

export function getUTCDate (formattedDate) {
  if (formattedDate) {
    const dateObject = date.extractDate(formattedDate, 'YYYY-MM-DD HH:mm')
    return dateObject ? dateObject.toISOString() : null
  } else {
    const now = new Date()
    return now.toISOString()
  }
}
