import data from '../sampleData'

// THIS USES DUMMY DATA
export const getEventData = (id) => {
    const event = data.sampleData.find(event=>event.id.toString()===id)
    return event
}


// CONNECT TO MONGO DB:
export const getAllEvents = async () => {
    const res = await fetch(`http://localhost:3000/api/events`, { method: 'GET', })
    const resToJson = await res.json()
    const eventData = resToJson.data
    return eventData
}

export const getEvent = async (id) => {
    const res = await fetch(`http://localhost:3000/api/events/${id}`, { method: 'GET', })
    const resToJson = await res.json()
    const eventData = resToJson.data
    return eventData
}

export const deleteEvent = async (id) => {
    const res = await fetch(`http://localhost:3000/api/events/${id}`, { method: 'DELETE', })
    const resToJson = await res.json()
    const eventData = resToJson.data
    return eventData
}

// NOT TESTED YET:
export const addEvent = async (data) => {
    console.log('on client side', data)
    const res = await fetch(
      `http://localhost:3000/api/events`, 
        {
          method: 'POST', 
          headers: {'Content-Type': 'application/json'}, 
          body: JSON.stringify(data),
        }
      )
    const resToJson = await res.json()
    const eventData = resToJson.data
    return eventData
}
export const updateEvent = async (id, data) => {
    const res = await fetch(`http://localhost:3000/api/events/${id}`, { method: 'PUT', body: JSON.stringify(data) })
    const resToJson = await res.json()
    const eventData = resToJson.data
    return eventData
}