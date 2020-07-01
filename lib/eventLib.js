import data from '../sampleData'

export const getEventData = (id) => {
    const event = data.sampleData.find(event=>event.id.toString()===id)
    return event
}