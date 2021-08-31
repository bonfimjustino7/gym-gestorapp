import {format, parseISO} from 'date-fns';

export function getDateFormatter(dateStr) {
  return parseISO(dateStr).getTime()
    ? format(parseISO(dateStr), 'dd/MM/yyyy')
    : '-';
}
