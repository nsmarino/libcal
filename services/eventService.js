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

// NOT TESTED YET - WILL BE USED FOR REGISTERING
export const updateEvent = async (id, data) => {

    const res = await fetch(
      `http://localhost:3000/api/events/${id}`, 
      { 
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},  
        body: JSON.stringify(data) 
      }
    )
    const resToJson = await res.json()
    console.log(resToJson)
    const eventData = resToJson.data
    return eventData
}

// should i use??
export const getEventsByMonth = async (currentMonth) => {
  const res = await fetch(
    `http://localhost:3000/api/events/byMonth`,
    {
      method: 'POST', 
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(currentMonth),
    }
  )
  const resToJson = await res.json()
  const eventData = resToJson.data
  return eventData
}