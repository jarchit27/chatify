// const express = require('express');
// using nodemon for auto-restarting the server on code changes

import express from 'express'; // for using, had to add "type": "module" in package.json
import dotenv from 'dotenv';
import path from 'path';

import authRoutes from './routes/auth.route.js';  
import messageRoutes from './routes/message.route.js';

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// Make ready for production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});