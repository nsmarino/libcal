// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// I will use lambda functions to make CRUD calls to mongoDB 

export default (req, res) => {
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}
