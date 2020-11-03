# awesome-source

# About

Whlie wanting to contribute to open-source projects, people often have to go through the hassle of finding them on GitHub, and doing tons of other things. Awesome Source aims to simplify this. Maintainers and project owners can put the project up on the website, and people can have a much easier, and more simplified search system leading them to more direct results on open source projects which would best be fit for them.

# Getting started

## Prerequisites

- [Node.js]
- [npm] (ships with Node.js, no need to install it in most cases)

## Building

- Clone the repo (`git clone url`)
- Install the pacakges (`npm install`)
- Create a .env file.

Inside the env file, add the following. 

```
SESSION_SECRET=secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/google/callback
MONGO_CONNECTION=your_mongo_connection
```

You can get a Google client id, secret, and set a callback URL at the [google developer console].

You can get an Mongo connection from [MongoDB Atlas]

- Start nodemon (`nodemon server.js`) and navigate to `localhost:5000` in your browser.

[Node.js]: https://nodejs.org/en/
[npm]: https://www.npmjs.com/
[google developer console]: https://console.developers.google.com/
[MongoDB Atlas]: https://https://cloud.mongodb.com/
