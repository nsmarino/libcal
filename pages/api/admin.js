import dbConnect from '../../utils/dbConnect'
import errorHandler from '../../utils/errorHandler'
const bcrypt = require('bcrypt')
import Admin from '../../models/Admin'

export default async function adminHandler(req, res) {
  const { method } = req
  await dbConnect()
  switch (method) {
    case 'GET':
      try {
        const admins = await Admin.find({}) /* find all the data in our database */
        res.status(200).json({ success: true, data: admins })
      } catch (error) {
        res.status(400).json({ success: false })
      }    
      break;
    case 'POST':
      try {
        
        const body = req.body

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)
      
        const admin = new Admin({
          username: body.username,
          passwordHash,
        })
      
        const savedAdmin = await admin.save()
    
        res.json(savedAdmin)
        
      } catch (error) {
        errorHandler(error, req, res)
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}