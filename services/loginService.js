import axios from "axios"
import { api } from '../utils/config'

export const login = async (data) => {
  const res = await axios.post(
    `${api}/login`,
    data,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
  if (res.status===500) {
    return false
  } else if (res.status===200) {
    return res.data
  }
}  