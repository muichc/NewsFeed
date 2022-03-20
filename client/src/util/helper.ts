import moment from 'moment'

const capitalize = (word:string) => {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

const convertDate =(date: string) => {
    const year = date.slice(0, 4)
    const month = date.slice(5, 7)
    const day = date.slice(8, 10)
    const time = date.slice(11,19)
    const dateType = new Date(`${year}-${month}-${day} ${time} UTC`)
    const formatted = moment(dateType).format('L LT')
    return formatted
}

export { capitalize, convertDate }