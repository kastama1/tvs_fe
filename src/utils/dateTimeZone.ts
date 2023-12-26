import moment from 'moment-timezone'

const momentDefault = (date?: string, format?: string) => {
    return date
        ? moment(date)
              .utc()
              .format(format ?? 'YYYY-MM-DDTHH:mm')
        : moment()
              .tz('Europe/Prague')
              .format(format ?? 'YYYY-MM-DDTHH:mm')
}
export default momentDefault
