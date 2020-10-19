import { createMocks } from 'node-mocks-http';
const mongoose = require('mongoose')
import eventsHandler from '../pages/api/events/index'
import Event from '../models/Event'
import dbConnect from '../utils/dbConnect';

const initialEvents = [
    {
        dates: [
            {
                dayOfWeek: 3,
                day: 7,
                month: 9,
                year: 2020
            }
        ],
        formData: {
            title: 'Testing Data',
            description: 'Cool for cats',
            startDate: '2020-10-07',
            startTime: '12:00',
            endTime: '14:00',
            classSize: '10',
            registrationRequired: false,
            carmelOnly: false,
            recurring: false,
        },
        registered: [

        ],
    },
    {
        dates: [
            {
                dayOfWeek: 3,
                day: 7,
                month: 9,
                year: 2020
            }
        ],
        formData: {
            title: 'Alex g',
            description: 'Cool for cats',
            startDate: '2020-10-07',
            startTime: '12:00',
            endTime: '14:00',
            classSize: '10',
            registrationRequired: false,
            carmelOnly: false,
            recurring: false,
        },
        registered: [
            
        ],
    },
]

beforeEach(async () => {
    await dbConnect()
    await Event.deleteMany({})  
    let eventObject = new Event(initialEvents[0])  
    await eventObject.save()  
    eventObject = new Event(initialEvents[1])  
    await eventObject.save()
})

describe('/api/events', () => {
    test('gets all events', async () => {
      const { req, res } = createMocks({
        method: 'GET',
      });
  
      await eventsHandler(req, res);

      expect(res._getStatusCode()).toBe(200);
      expect(JSON.parse(res._getData())).toEqual(
        expect.objectContaining({
          success: true,
        }),
      );
    });

    test('add new event', async () => {
      const newEvent = {
        dates: [
            {
                dayOfWeek: 2,
                day: 4,
                month: 10,
                year: 2020
            }
        ],
        formData: {
            title: 'Sample new event',
            description: 'Rock star',
            startDate: '2020-10-07',
            startTime: '12:00',
            endTime: '14:00',
            classSize: '10',
            registrationRequired: false,
            carmelOnly: false,
            recurring: false,
        },
        registered: [

        ],
      }
      const { req, res } = createMocks({
        method: 'POST',
        body: newEvent,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': `token=${token}` // Need to mock authentication before tests.
        }
      });
      
      await eventsHandler(req, res);

      expect(res._getStatusCode()).toBe(200);

    })
  });

afterAll(() => {
  mongoose.connection.close()
})