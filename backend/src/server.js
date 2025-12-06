// const express = require('express');
// using nodemon for auto-restarting the server on code changes

import express from 'express'; // for using, had to add "type": "module" in package.json
import dotenv from 'dotenv';

import authRoutes from './routes/auth.route.js';  
import messageRoutes from './routes/message.route.js';

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});