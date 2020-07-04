import data from '../sampleData'

export const getEventData = (id) => {
    const event = data.sampleData.find(event=>event.id.toString()===id)
    return event
}

export const getAllEvents = async () => {
    const res = await fetch(`http://localhost:3000/api/events`, { method: 'GET', })
    const resToJson = await res.json()
    const eventData = resToJson.data
    return eventData
}