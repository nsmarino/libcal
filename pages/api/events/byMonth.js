import dbConnect from '../../../utils/dbConnect'
import Event from '../../../models/Event'

export default async function eventsHandler(req, res) {
  const { method } = req
  await dbConnect()
  switch (method) {
    case 'GET':
      res.status(400).json({ success: false })
      break
    case 'POST':
      try {
        // console.log('on server side', req.body)
        // naming problem here?
        const month = req.body.number
        const year = req.body.year
        // console.log(month, year)
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