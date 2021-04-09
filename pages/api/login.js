import dbConnect from '../../utils/dbConnect'
import errorHandler from '../../utils/errorHandler'
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
import Admin from '../../models/Admin'

export default async function loginHandler(req, res) {
  const { method } = req
  await dbConnect()
  switch (method) {
    case 'POST':
      try {
        const body = req.body

        const admin = await Admin.findOne({ username: body.username })
        const passwordCorrect = admin === null
          ? false
          : await bcrypt.compare(body.password, admin.passwordHash)
      
        if (!(admin && passwordCorrect)) {
          return res.status(401).json({
            error: 'invalid username or password'
          })
        }
      
        const adminForToken = {
          username: admin.username,
          id: admin._id,
        }
      
        const token = jwt.sign(adminForToken, process.env.SECRET)
        res
          .status(200)
          .send({ token, username: admin.username })
      } catch (error) {
        errorHandler(error, req, res)
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}