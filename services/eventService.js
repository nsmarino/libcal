import axios from "axios"
import { api } from '../utils/config'

// GET requests: //
export const getAllEvents = async () => {
  const res = await axios.get(`${api}/events`)
  return res.data.data
}
export const getEventsByMonth = async (currentMonth) => {
  const res = await axios.post(
    `${api}/events/byMonth`,
    currentMonth,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  return res.data.data
}
export const getEvent = async (id) => {
  const res = await axios.get(`${api}/events/${id}`)
  return res.data.data
}
// DELETE requests: //
export const deleteEvent = async (id, token) => {
  const res = await axios.delete(
    `${api}/events/${id}`,
    {
      headers: {
        'Set-Cookie': `token=${token}`,
      }
    }
  )
  return res.data.data
}
// POST requests: //
export const addEvent = async (data, token) => {
  const res = await axios.post(
    `${api}/events/`,
    data,
    {
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `token=${token}`
      }
    }
  )
  return res.data.data
}
// PUT requests: //
export const updateEvent = async (id, data, token) => {
  const res = await axios.put(
    `${api}/events/${id}`,
    data,
    {
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `token=${token}`
      }
    }
  )
  return res.data.data
}
export const registerForEvent = async (id, data) => {
  const res = await axios.put(
    `${api}/events/${id}/register`,
    data,
    {
      headers: {
        'Content-Type': 'application/json',
      }
    }
  )
  return res.data.data
}



