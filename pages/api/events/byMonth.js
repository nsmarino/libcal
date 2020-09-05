import dbConnect from '../../../utils/dbConnect'
import Event from '../../../models/Event'

// A post request with a month and year will return only the events for that month.
export default async function eventsHandler(req, res) {
  const { method } = req
  await dbConnect()
  switch (method) {
    case 'GET':
      res.status(400).json({ success: false })
      break
    case 'POST':
      try {
        const month = req.body.number
        const year = req.body.year
        const eventsByMonth = await Event.find(
            { 'dates.month': month, 'dates.year': year }) /* find all the data in our database */
            res.status(200).json({ success: true, data: eventsByMonth })
    } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}