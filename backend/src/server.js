import express from 'express'; // for using, had to add "type": "module" in package.json
import path from 'path';
import { connectDB } from './lib/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.route.js';  
import messageRoutes from './routes/message.route.js';
import { ENV } from './lib/env.js';

const app = express();

const port = ENV.PORT || 3000;
const __dirname = path.resolve();

app.use(express.json()); // Middleware to parse JSON bodies req.body
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}))
app.use(cookieParser()); // Middleware to parse cookies req.cookies

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// Make ready for production
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  connectDB();
});