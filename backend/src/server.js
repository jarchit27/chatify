import express from 'express';
import path from 'path';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';  
import messageRoutes from './routes/message.route.js';
import { ENV } from './lib/env.js';
import { app, server } from './lib/socket.js';

const port = ENV.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json({ limit: "5mb" })); // Middleware to parse JSON bodies req.body
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}))
app.use(cookieParser()); // Middleware to parse cookies req.cookies

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// Make ready for production
if (ENV.NODE_ENV === "production") {
  const staticPath = path.join(__dirname, "../frontend/dist");
  console.log("Production mode: serving static files from", staticPath);
  app.use(express.static(staticPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });
} else {
  console.log("Development mode: NODE_ENV =", ENV.NODE_ENV);
}

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDB();
});