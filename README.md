# My chat hub
Simple chat based on websocket. After creating an account, the user can send text messages and pictures in real time. They are saved in the database so it is possible to read the history of the conversation.
## Tech Stack

- React
- Typescript
- React-router
- Websocket
- Tailwind
- Jest / Vitest
- NodeJS
- ExpressJS
- MongoDB
- Vite
- JWT
- Docker

## Live demo

https://chatapp.toadres.pl

## How to run locally?

Clone the project

```bash
git clone https://github.com/MaciejTom/my-chat-hub.git
```

Go to the project directory

```bash
cd my-chat-hub
```


## Frontend

```bash
cd client
```
Install dependencies

```bash
npm install
```
Add a file named '.env' and paste this content:

```bash
VITE_PUBLIC_URL="http://localhost:3000"
VITE_API_URL="http://localhost:3000/api/v1"
VITE_WS_URL="ws://localhost:3000"
```
Start the client

```bash
npm run dev
```
## Backend
```bash
cd ..; cd api
```
Install dependencies

```bash
npm install
```
Add a file named '.env' and paste this content:

```bash
CLIENT_URL="http://127.0.0.1:5173"
MONGO_URI="mongodb+srv://user:user@chatapp.brcccd7.mongodb.net/?retryWrites=true&w=majority"
JWT_SECRET="G+KaPdSgVkYp3s6v9y$B&E)H@McQeThW"
JWT_LIFETIME=30d
BCRYPTO_SALT=10
```
Start the server

```bash
npm start
```
Add a file named '.env' and paste this content:

```bash
PORT=5000
MONGO_URI=mongodb+srv://user:user@my-shopping-hub.wtoke.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
NODE_ENV=development
```
Go to the client directory

```bash
cd frontend
```

Install dependencies

```bash
npm install
```


Go back to project directory

```bash
cd ..
```


Start the server
```bash
npm run start
```