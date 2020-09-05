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
        console.log(events)
        res.status(200).json({ success: true, data: events })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST': // Add new event.
      try {
        console.log('on server side', req.body)
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

// const errorHandler = (error, request, response) => {
//   console.log('error handler', error.name)
//   if (error.name === 'CastError' && error.kind === 'ObjectId') {
//     return response.status(400).send({ error: 'malformatted id' 
//     })
//   } else if (error.name === 'ValidationError') {
//     return response.status(400).json({ error: error.message 
//     })
//   } else if (error.name === 'JsonWebTokenError') {
//     return response.status(401).json({
//       error: 'invalid token'
//     })
//   } else {
//     response.status(400).json({ success: false })
//   }
// }