import { parseISO, format } from 'date-fns'
import { nb } from 'date-fns/locale'

export default function Date({ dateString }) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'd LLLL	yyyy, hh:mm:ss', { locale: nb })}</time>
}
