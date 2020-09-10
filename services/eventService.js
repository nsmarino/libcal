// CRUD routes for events

// GET //
export const getAllEvents = async () => {
    const res = await fetch(`http://localhost:3000/api/events`, { method: 'GET', })
    const resToJson = await res.json()
    const eventData = resToJson.data
    return eventData
}

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

export const getEvent = async (id) => {
    const res = await fetch(`http://localhost:3000/api/events/${id}`, { method: 'GET', })
    const resToJson = await res.json()
    const eventData = resToJson.data
    return eventData
}

// DELETE //
export const deleteEvent = async (id) => {
    const res = await fetch(`http://localhost:3000/api/events/${id}`, { method: 'DELETE', })
    const resToJson = await res.json()
    const eventData = resToJson.data
    return eventData
}

// ADD //
export const addEvent = async (data) => {
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

// UPDATE //
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
    const eventData = resToJson.data
    return eventData
}

