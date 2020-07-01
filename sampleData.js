const devUrl = 'mongodb://localhost/bloglist'

const sampleData = [
    {
    title: 'oil painting',
    date: 1,
    time: '8:00',
    description: 'Make a painting with oil',
    registered: [],
    id: 89981,
    },
    {
        title: 'book club',
        date: 3,
        time: '4:00',
        description: 'read a book in a club',
        registered: [],
        id: 89708,
    },
    {
      title: 'knitting',
      date: 18,
      time: '4:00',
      description: 'scarves are among the things you can knit',
      registered: [],
      id: 66666,
  }
  ]
  
const sampleMonth = {
name: 'November',
days: 30,
startsOn: 'Sunday'
}

export default {sampleData, sampleMonth}