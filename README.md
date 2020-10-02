# Reed Events

Event calendar created for Reed Memorial Library in Carmel, NY. Patrons can register for events that are created with an admin login. Admins have options to set daily, weekly or monthly recurrence patterns. Patrons receive confirmation emails after registering for events.

## Map
Index contains the calendar with dynamic routes for different events and their admin and registration pages. A lot of complex logic for creating event recurrence patterns is stored in the EventForm component and is built on momentJS. Admin token is generated using JWT and stored in cookies. Serverless functions, made possible by NextJS's Pages API, communicate with a MongoDB database to store event information.

## CLI Commands

```bash
# install dependencies
yarn install

# dev server with hot reload at localhost:3000
yarn dev

# build for production
yarn build

# start production server
yarn start
```

## Learn More


 Hosted on [Vercel](https://vercel.com/) at
