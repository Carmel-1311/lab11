import cors from 'cors';
import express from 'express';
import menuRoutes from './routes/menuRoutes.js';
import typeRoutes from './routes/typeRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Lab11 API is running' });
});

app.use('/api/menu', menuRoutes);
app.use('/api/type', typeRoutes);

export default app;
