let api = 'https://reedevents.vercel.app/api'

if (process.env.NODE_ENV === 'development') {  
    api = 'http://localhost:3000/api'
  }

module.exports = {
    api
}
