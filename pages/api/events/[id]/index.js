import dbConnect from '../../../../utils/dbConnect'
import Event from '../../../../models/Event'
const jwt = require('jsonwebtoken')

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'GET' /* Get a model by its ID */:
      try {
        const event = await Event.findById(id)
        if (!event) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: event })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break

    case 'PUT' /* Edit a model by its ID */:
      try {
        const token = req.cookies.token
        const decodedToken = jwt.verify(token, process.env.SECRET)  
        if (!token || !decodedToken.id) {    
          return response.status(401).json({ error: 'token missing or invalid' })  
        }

        const event = await Event.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!event) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: event })
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false })
      }
      break

      // NEEDS TOKEN
    case 'DELETE' /* Delete a model by its ID */:
       try {
        const token = req.cookies.token
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) { 
          console.log('returning error')   
          return response.status(401).json({ error: 'token missing or invalid' })  
        }
        
        const deletedEvent = await Event.deleteOne({ _id: id })
        if (!deletedEvent) {
          return res.status(400).json({ success: false })
        }
        res.status(200).json({ success: true, data: {} })
      } catch (error) {
        console.log('catching error!')
        res.status(400).json({ success: false })
      }
      break

    default:
      res.status(400).json({ success: false })
      break
  }
}