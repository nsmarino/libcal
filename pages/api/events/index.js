import dbConnect from '../../../utils/dbConnect'
import errorHandler from '../../../utils/errorHandler'
import Event from '../../../models/Event'

export default async function eventsHandler(req, res) {
  const { method } = req
  await dbConnect()
  switch (method) {
    case 'GET':
      try {
        const events = await Event.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: events })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST': // Add new event.
      try {
        const event = await Event.create(
          req.body
        )
        res.status(201).json({ success: true, data: event })
      } catch (error) {
        errorHandler(error, req, res)
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}