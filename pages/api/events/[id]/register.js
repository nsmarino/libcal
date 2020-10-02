import dbConnect from '../../../../utils/dbConnect'
import Event from '../../../../models/Event'
import sendEmail from '../../../../utils/sendEmail'
export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req

  await dbConnect()

  switch (method) {
    case 'PUT' /* Edit a model by its ID */:
      try {
        console.log(req.body)
        const event = await Event.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        })
        if (!event) {
          return res.status(400).json({ success: false })
        }
        await sendEmail(req.body);
        res.status(200).json({ success: true, data: event })
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