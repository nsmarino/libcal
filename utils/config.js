let api = 'https://reedevents.vercel.app/api'
let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'development') {  
    api = 'http://localhost:3000/api'
  }
  
if (process.env.NODE_ENV === 'test') {
  api = 'http://localhost:3000/api'
  MONGODB_URI= 'mongodb://localhost/libcaltest'
}

module.exports = {
    api,
    MONGODB_URI
}
