import dbConnect from '../../../utils/dbConnect'
import Event from '../../../models/Event'

export default async function eventsHandler(req, res) {
  const { method } = req
  await dbConnect()
  switch (method) {
    case 'GET':
      try {
        const events = await Event.find({}) /* find all the data in our database */
        console.log(events)
        res.status(200).json({ success: true, data: events })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        console.log('on server side', req.body)
        const event = await Event.create(
          req.body
        ) /* create a new model in the database */
        res.status(201).json({ success: true, data: event })
      } catch (error) {
        console.log(error)
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}